const userModel = require('../model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const transporter = require('../config/nodemail');

// ================= REGISTER =================
const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide all the details"
      });
    }

    const existingUser = await userModel.findOne({
      email: email.toLowerCase().trim()
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      email: email.toLowerCase().trim(),
      password: hashedPassword
    });

    const token = jwt.sign(
      { id: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite:
        process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    // 🔥 Send email in background (DO NOT await)
    transporter.sendMail({
      from: `"Dropnest Team" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Welcome to Dropnest 🎉",
      text: `Your account has been created successfully.`
    }).catch(err =>
      console.log("Register email failed:", err.message)
    );

    return res.status(200).json({
      success: true,
      message: "User registered successfully",
      token
    });

  } catch (error) {
    console.log("REGISTER ERROR:", error.message);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// ================= LOGIN =================
const loginUSer = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({
      email: email.toLowerCase().trim()
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite:
        process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    // 🔥 Send login alert in background
    transporter.sendMail({
      from: `"Dropnest Security" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "New Login Detected 🔐",
      text: `New login at ${new Date().toLocaleString()}`
    }).catch(err =>
      console.log("Login email failed:", err.message)
    );

    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      token
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// ================= LOGOUT =================
const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite:
        process.env.NODE_ENV === "production" ? "none" : "lax"
    });

    return res.status(200).json({
      success: true,
      message: "User logged out successfully"
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error logging out"
    });
  }
};


// ================= SEND OTP =================
const sendrestPasswordOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await userModel.findOne({
      email: email.toLowerCase().trim()
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found"
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.otp = otp;
    user.otpExpiry = Date.now() + 15 * 60 * 1000;
    await user.save();

    // 🔥 Send OTP email in background
    transporter.sendMail({
      from: `"Dropnest Support" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Reset Password OTP",
      text: `Your OTP is ${otp}`
    }).catch(err =>
      console.log("OTP email failed:", err.message)
    );

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully"
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// ================= RESET PASSWORD =================
const resetPassword = async (req, res) => {
  try {
    const { email, newPassword, otp } = req.body;

    const user = await userModel.findOne({
      email: email.toLowerCase().trim()
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found"
      });
    }

    if (user.otp !== otp || user.otpExpiry < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP"
      });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password reset successfully"
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


module.exports = {
  registerUser,
  loginUSer,
  logoutUser,
  sendrestPasswordOtp,
  resetPassword
};