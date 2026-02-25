const express = require('express');
const {authMiddleware} = require('../middelware/auth')
const {logoutUser,loginUSer,registerUser,resetPassword,sendrestPasswordOtp} = require('../controllers/auth-controller');

const authRouter = express.Router();

authRouter.post('/register',registerUser);
authRouter.post('/login',loginUSer);
authRouter.post('/resetPassword',authMiddleware,resetPassword);
authRouter.post('/sendResetPasswordOtp',authMiddleware,sendrestPasswordOtp);
authRouter.post('/logout',logoutUser);

module.exports=authRouter;