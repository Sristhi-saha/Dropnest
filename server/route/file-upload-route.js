const express = require('express');
const upload = require('../middelware/multer'); 
const {authMiddleware} = require('../middelware/auth')
const { uploadFile, deleteFile, fetchAllFiles } = require('../controllers/fil-upload-controller');

const fileRouter = express.Router();

fileRouter.post('/upload-file',authMiddleware, upload.single("file"), uploadFile);
fileRouter.delete('/delete-file/:id',authMiddleware, deleteFile);
fileRouter.get('/fetch-all-files',authMiddleware,fetchAllFiles)

module.exports = fileRouter;