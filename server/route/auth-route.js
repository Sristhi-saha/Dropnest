const express = require('express');
const {authMiddelware} = require('../middelware/auth')
const {logoutUser,loginUSer,registerUser,resetPassword,sendrestPasswordOtp} = require('../controllers/auth-controller');

const authRouter = express.Router();

authRouter.post('/register',registerUser);
authRouter.post('/login',loginUSer);
authRouter.post('/resetPassword',authMiddelware,resetPassword);
authRouter.post('/sendResetPasswordOtp',authMiddelware,sendrestPasswordOtp);
authRouter.post('/logout',logoutUser);

module.exports=authRouter;