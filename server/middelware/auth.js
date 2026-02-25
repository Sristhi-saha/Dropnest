const jwt = require('jsonwebtoken');
const User = require('../model/user');

const authMiddleware = async (req, res, next) => {
    try {
        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Not authorized, no token received"
            });
        }

        // ✅ verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // ✅ find user — properly declared as const user
        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found"
            });
        }
        req.user = user;         
        req.userId = user._id;   
        console.log('req.userId:', req.userId);
        next();

    } catch (e) {
        return res.status(401).json({
            success: false,
            message: e.message
        });
    }
};

module.exports = { authMiddleware };