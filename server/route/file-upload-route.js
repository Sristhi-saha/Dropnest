const express = require('express');
const upload = require('../middelware/multer'); 
const {authMiddelware} = require('../middelware/auth')
const { uploadFile, deleteFile, fetchAllFiles } = require('../controllers/fil-upload-controller');

const fileRouter = express.Router();

fileRouter.post('/upload-file',authMiddelware, upload.single("file"), uploadFile);
fileRouter.delete('/delete-file/:id',authMiddelware, deleteFile);
fileRouter.get('/fetch-all-files',fetchAllFiles)

module.exports = fileRouter;