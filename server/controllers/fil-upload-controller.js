const file = require('../model/file');
const cloudinary = require('../config/cloudinary-config');

const fetchAllFiles = async(req,res)=>{
  try{
    const files = await file.find({ uploadedBy: req.userId });
    console.log('files found:', files.length);
    console.log(req.userId)
    res.status(200).json({
      success:true,
      data:files,
      count:files.length
    })
  }catch(e){
    res.status(500).json({
      success:false,
      message:e.message
    })
  }
}

const uploadFile = async(req,res)=>{
    try{

        if(req.MulterError){
          return res.status(400).json({
                success: false,
                message: req.MulterError.message,
            });
        }
        //check if file exists 
        if(!req.file){
            return res.status(400).json({
                success:false,
                message:"No file is there"
            })
        }

        //upload file to cloudinary
        const result = await cloudinary.uploader.upload(req.file.path,   // ✅ VERY IMPORTANT
      {
        resource_type: "auto"
      });

        //save file details in databases
        const newFile = await file.create({
            fileName:req.file.originalname,
            public_id:result.public_id,
            url:result.secure_url,
            uploadedBy:req.userId
        })

        res.status(201).json({
            success:true,
            message:"File uploaded successfully",
            file:newFile
        })
    }catch(e){
       res.status(500).json({
        success:false,
        message:e.message
       })
    }
}

const deleteFile = async (req, res) => {
  try {
    const { id } = req.params;

    // find file in DB
    const existingFile = await file.findById(id);

    if (!existingFile) {
      return res.status(404).json({
        success: false,
        message: "File not found"
      });
    }

    // delete from cloudinary
    await cloudinary.uploader.destroy(existingFile.public_id);

    // delete from database
    await file.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "File deleted successfully"
    });

  } catch (e) {
    res.status(500).json({
      success: false,
      message: e.message
    });
  }
};

module.exports = {uploadFile,deleteFile,fetchAllFiles}