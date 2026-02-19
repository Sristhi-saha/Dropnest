const user = require('../model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const transporter = require('../config/nodemail');

//register controller
const registerUser = async(req,res)=>{
    try{
        //extract user from response
        const {username,email,password} = req.body;

        if(!username || !email || !password){
            return res.json({
                success:false,
                message:"Please provide all the details"
            })
        }

        //check if the user is present or not
        const finduser = await user.findOne({$or:[{username},{email}]});
        if(finduser){
            return res.status(400).json({
                success:false,
                message:"user is already present with this username and email"
            })
        }

        //hash user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        //create a new user and save 
        const newUser = new user({
            username,
            email,
            password:hashedPassword
        })

        
        newUser.save();

        const token = jwt.sign({
            id:newUser._id
        },process.env.JWT_SECRET,{expiresIn:'1d'});

        res.cookie('token',token,{
            httpOnly:true,
            secure:process.env.NODE_ENV === 'production',
            sameSite:process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        await transporter.sendMail({
            from:`"Dropnest"<${process.env.EMAIL_USER}>`,
            to:email,
            subject:"Welcome to Dropnest",
            text:`Welcome! Your account has been created using ${email}`
        })

        if(!newUser){
            return res.status(400).json({
                success:false,
                message:"Unable to register user please try again"
            })
        }

        res.status(200).json({
            success:true,
            message:'User registered successfully',
            token
        })

    }catch(e){
        res.status(500).json({
            success:false,
            message:e.message
        })
    }
}


const loginUSer = async(req,res)=>{
    try{
        //EXTRACT
        const {username,password}= req.body;
        //check if present or not
        const findUser = await user.findOne({$or:[{username},{email}]});
        if(!findUser){
            return res.status(400).json({
                success:false,
                message:'user is not found'
            })
        }
        //compare password
        const isMatch = await bcrypt.compare(password,findUser.password);
        if(!isMatch){
            return res.status(400).json({
                success:false,
                message:"Invalid Credentials"
            })
        }
        //generate token
        const token = jwt.sign({id:findUser._id},process.env.JWT_SECRET,{expiresIn:'1d'});

        res.cookie('token',token,{
            httpOnly:true,
            secure:process.env.NODE_ENV === 'production',
            sameSite:process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        
        res.status(200).json({
            success:true,
            message:'User logged in successfully',
            token
        })
    }catch(e){
        res.status(500).json({
            success:false,
            message:e.message
        })
    }
}


const logoutUser = async(req,res)=>{
    try{
        res.clearCookie('token',{
            httpOnly:true,
            secure:process.env.NODE_ENV === 'production',
            sameSite:process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        });

        res.status(200).json({
            success:true,
            message:"user logged out successfully"
        })

    }catch(e){
        res.status(500).json({
            success:false,
            message:"Error logging out"
        })
    }
}

const resetPassword = async(req,res)=>{
    try{
        const {email,newPassword,otp} = req.body;

        if(!email || !newPassword || !otp){
            return res.status(400).json({
                success:false,
                message:'Please provide all the details'
            })
        }

        const findUser = await user.findOne({email});
        if(!findUser){
            return res.status(400).json({
                success:false,
                message:"user is not found with this email"
            })
        }        

    }catch(e){
        res.status(500).json({
            success:false,
            message:'Error resetting password'
        })
    }
}