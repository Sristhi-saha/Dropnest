const mongoose = require('mongoose');

//define schema for file upload
const fileSchema = new mongoose.Schema({
    fileName:{
        type:String,
        required:true
    },
    public_id:{
        type:String,
        required:true
    },
    url:{
        type:String,
        required:true
    },
    uploadedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }
},{timestamps:true}) 


module.exports = mongoose.model("File",fileSchema);