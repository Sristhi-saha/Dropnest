const jwt = require('jsonwebtoken');
const User = require('../model/user');

const authMiddelware = async(req,res,next) =>{
    try{
        let token;
        //get token from header
        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
            token = req.headers.authorization.split(" ")[1];
        }
        if(!token){
            return res.status(401).json({
                success:false,
                message:"Not authorized , no token received"
            })
        }  
        
        //verify token
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        
        //find user
        const user = await User.findById(decoded.id).select("-password");
        if(!user){
            return res.status(401).json({
                success:false,
                message:"user not found!!"
            })
        }
        req.user = user;
        next();
    }catch(e){
        return res.status(401).json({
            success:false,
            message:e.message
        })
    }
}

module.exports = {authMiddelware}