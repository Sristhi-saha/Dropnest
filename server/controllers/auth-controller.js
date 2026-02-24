const userModel = require('../model/user'); // renamed to avoid conflicts
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const transporter = require('../config/nodemail');

// Register
const registerUser = async (req, res) => {
    try {
        const {email, password } = req.body;

        if ( !email || !password) {
            return res.status(400).json({ success: false, message: "Please provide all the details" });
        }

        const finduser = await userModel.findOne({email });
        if (finduser) {
            return res.status(400).json({ success: false, message: "User already exists with this username or email" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({ email, password: hashedPassword });
        await newUser.save(); // ✅ await added

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        await transporter.sendMail({
            from: `"Dropnest Team" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "🎉 Welcome to Dropnest!",
            text: `
Welcome to Dropnest!

Hi there,

Your account has been successfully created using this email: ${email}

You can now explore products, manage your orders, and enjoy seamless shopping with us.

If you did not create this account, please contact our support team immediately.

Thank you,
The Dropnest Team
  `,
            html: `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
    <h2 style="color: #111;">🎉 Welcome to Dropnest!</h2>
    <p>Hi there,</p>
    <p>Your account has been successfully created using:</p>
    <p style="font-weight: bold; color: #333;">${email}</p>

    <p>You can now explore products, manage your orders, and enjoy seamless shopping with us.</p>

    <a href="https://yourwebsite.com" 
       style="display: inline-block; margin-top: 15px; padding: 10px 20px; background-color: #000; color: #fff; text-decoration: none; border-radius: 5px;">
       Visit Dropnest
    </a>

    <hr style="margin: 20px 0;" />

    <p style="font-size: 12px; color: #777;">
      If you did not create this account, please contact our support team immediately.
    </p>

    <p style="font-size: 14px;">
      Regards,<br/>
      <strong>Dropnest Team</strong>
    </p>
  </div>
  `
        });

        res.status(200).json({ success: true, message: 'User registered successfully', token });

    } catch (e) {
    console.log("REGISTER ERROR:", e);
    res.status(500).json({ success: false, message: e.message });
}
};

// Login
const loginUSer = async (req, res) => {
    try {
        const { email, password } = req.body; // ✅ email added

        const findUser = await userModel.findOne({email:email.toLowerCase().trim()});
        if (!findUser) {
            return res.status(400).json({ success: false, message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, findUser.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid Credentials" });
        }

        const token = jwt.sign({ id: findUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        await transporter.sendMail({
            from: `"Dropnest Security" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "🔐 New Login to Your Dropnest Account",
            text: `
Hi,

We noticed a new login to your Dropnest account.

Email: ${email}
Time: ${new Date().toLocaleString()}

If this was you, no action is needed.

If you did NOT log in, please reset your password immediately.

Stay secure,
Dropnest Team
  `,
            html: `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
    
    <h2 style="color: #111;">🔐 New Login Detected</h2>
    
    <p>Hello,</p>
    
    <p>We noticed a new login to your <strong>Dropnest</strong> account.</p>
    
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>

    <p>If this was you, you can safely ignore this email.</p>

    <p>If you did <strong>not</strong> log in, we recommend resetting your password immediately.</p>

    <a href="https://yourwebsite.com/forgot-password" 
       style="display: inline-block; margin-top: 15px; padding: 10px 20px; background-color: #d9534f; color: #fff; text-decoration: none; border-radius: 5px;">
       Reset Password
    </a>

    <hr style="margin: 20px 0;" />

    <p style="font-size: 12px; color: #777;">
      For security reasons, please do not share your login details with anyone.
    </p>

    <p>
      Regards,<br/>
      <strong>Dropnest Security Team</strong>
    </p>

  </div>
  `
        });

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
            from: `"Dropnest Support" <${process.env.EMAIL_USER}>`,
            to: findUser.email,
            subject: "🔐 Reset Your Password - OTP Verification",

            text: `
Hello,

We received a request to reset your Dropnest account password.

Your One-Time Password (OTP) is: ${otp}

This OTP is valid for 10 minutes.

If you did not request a password reset, please ignore this email or contact support immediately.

Regards,
Dropnest Support Team
  `,

            html: `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
    
    <h2 style="color: #111;">🔐 Password Reset Request</h2>
    
    <p>Hello,</p>
    
    <p>We received a request to reset your <strong>Dropnest</strong> account password.</p>
    
    <p style="margin: 20px 0;">Your One-Time Password (OTP) is:</p>
    
    <div style="font-size: 28px; font-weight: bold; letter-spacing: 5px; background: #f4f4f4; padding: 10px; text-align: center; border-radius: 6px;">
      ${otp}
    </div>

    <p style="margin-top: 20px;">This OTP is valid for <strong>10 minutes</strong>.</p>

    <p>If you did not request this password reset, please ignore this email or contact support immediately.</p>

    <hr style="margin: 20px 0;" />

    <p style="font-size: 12px; color: #777;">
      For security reasons, do not share this OTP with anyone.
    </p>

    <p>
      Regards,<br/>
      <strong>Dropnest Support Team</strong>
    </p>
  </div>
  `
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

        await transporter.sendMail({
            from: `"Dropnest Support" <${process.env.EMAIL_USER}>`,
            to: findUser.email,
            subject: "✅ Your Password Has Been Reset Successfully",

            text: `
Hello,

This is a confirmation that your Dropnest account password has been successfully reset.

If you made this change, no further action is required.

If you did NOT reset your password, please contact our support team immediately as your account may be at risk.

Regards,
Dropnest Support Team
  `,

            html: `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin:auto; padding:20px; border:1px solid #eee; border-radius:8px;">
    
    <h2 style="color: green;">✅ Password Reset Successful</h2>

    <p>Hello,</p>

    <p>Your <strong>Dropnest</strong> account password has been successfully updated.</p>

    <p>If you made this change, you can safely ignore this email.</p>

    <p style="color: red;">
      If you did NOT reset your password, please contact our support team immediately.
    </p>

    <hr style="margin:20px 0;" />

    <p style="font-size:12px; color:#777;">
      For security reasons, we recommend keeping your password confidential and not sharing it with anyone.
    </p>

    <p>
      Regards,<br/>
      <strong>Dropnest Support Team</strong>
    </p>
  </div>
  `
        });

        res.status(200).json({ success: true, message: 'Password reset successfully' });

    } catch (e) {
        res.status(500).json({ success: false, message: e.message }); // ✅ show actual error
    }
};

module.exports = { resetPassword, logoutUser, sendrestPasswordOtp, registerUser, loginUSer };