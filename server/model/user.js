const mongoose = require('mongoose');

//define the schema for user 
const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true
    }
},{timestamps:true})//automatically manage createdAt and updatedAt fields

//exports the user module
module.exports = mongoose.model('User',userSchema); 
