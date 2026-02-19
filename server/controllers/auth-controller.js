const userModel = require('../model/user'); // renamed to avoid conflicts
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const transporter = require('../config/nodemail');

// Register
const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ success: false, message: "Please provide all the details" });
        }

        const finduser = await userModel.findOne({ $or: [{ username }, { email }] });
        if (finduser) {
            return res.status(400).json({ success: false, message: "User already exists with this username or email" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({ username, email, password: hashedPassword });
        await newUser.save(); // ✅ await added

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        await transporter.sendMail({
            from: `"Dropnest"<${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Welcome to Dropnest",
            text: `Welcome! Your account has been created using ${email}`
        });

        res.status(200).json({ success: true, message: 'User registered successfully', token });

    } catch (e) {
        res.status(500).json({ success: false, message: e.message });
    }
};

// Login
const loginUSer = async (req, res) => {
    try {
        const { username, email, password } = req.body; // ✅ email added

        const findUser = await userModel.findOne({ $or: [{ username }, { email }] });
        if (!findUser) {
            return res.status(400).json({ success: false, message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, findUser.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid Credentials" });
        }

        const token = jwt.sign({ id: findUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.status(200).json({ success: true, message: 'User logged in successfully', token });

    } catch (e) {
        res.status(500).json({ success: false, message: e.message });
    }
};

// Logout
const logoutUser = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        });
        res.status(200).json({ success: true, message: "User logged out successfully" });
    } catch (e) {
        res.status(500).json({ success: false, message: "Error logging out" });
    }
};

// Send OTP
const sendrestPasswordOtp = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ success: false, message: "Email required!" });
        }

        const findUser = await userModel.findOne({ email }); // ✅ renamed to findUser
        if (!findUser) {
            return res.status(400).json({ success: false, message: 'User not found with this email' });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        findUser.otp = otp;
        findUser.otpExpiry = Date.now() + 15 * 60 * 1000;
        await findUser.save();

        await transporter.sendMail({
            from: `"Dropnest"<${process.env.EMAIL_USER}>`,
            to: findUser.email,
            subject: 'Reset Password OTP',
            text: `Your Reset Password OTP is: ${otp}`
        });

        return res.status(200).json({ success: true, message: 'OTP sent successfully' });

    } catch (e) {
        return res.status(500).json({ success: false, message: e.message });
    }
};

// Reset Password
const resetPassword = async (req, res) => {
    try {
        const { email, newPassword, otp } = req.body; // ✅ destructure FIRST

        if (!email || !newPassword || !otp) { // ✅ THEN validate
            return res.status(400).json({ success: false, message: 'Please provide all the details' });
        }

        const finduser = await userModel.findOne({ email }); // ✅ findOne (capital O)
        if (!finduser) {
            return res.status(400).json({ success: false, message: "User not found with this email" });
        }

        if (finduser.otp !== otp || finduser.otpExpiry < Date.now()) {
            return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        finduser.password = hashedPassword;
        finduser.otp = null;
        finduser.otpExpiry = null;
        await finduser.save();

        res.status(200).json({ success: true, message: 'Password reset successfully' });

    } catch (e) {
        res.status(500).json({ success: false, message: e.message }); // ✅ show actual error
    }
};

module.exports = { resetPassword, logoutUser, sendrestPasswordOtp, registerUser, loginUSer };