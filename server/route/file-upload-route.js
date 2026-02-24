const express = require('express');
const upload = require('../middelware/multer'); 
const { uploadFile, deleteFile, fetchAllFiles } = require('../controllers/fil-upload-controller');

const fileRouter = express.Router();

fileRouter.post('/upload-file', upload.single("file"), uploadFile);
fileRouter.delete('/delete-file/:id', deleteFile);
fileRouter.get('/fetch-all-files',fetchAllFiles)

module.exports = fileRouter;