const express = require('express');
const {logoutUser,loginUSer,registerUser,resetPassword,sendrestPasswordOtp} = require('../controllers/auth-controller');

const authRouter = express.Router();

authRouter.post('/register',registerUser);
authRouter.post('/login',loginUSer);
authRouter.post('/resetPassword',resetPassword);
authRouter.post('/sendResetPasswordOtp',sendrestPasswordOtp);
authRouter.post('/logout',logoutUser);

module.exports=authRouter;