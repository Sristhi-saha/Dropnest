const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const connectedToDb = require('./database/db');


const app = express();//initialize express app
dotenv.config();//configure dotenv to use .env file

//middelwares
app.use(express.json());//to parse json data
app.use(cookieParser());//to parse cookies
app.use(cors());//to use cors
//database connection

connectedToDb();

const port = process.env.PORT || 4000;

app.listen(port,()=>{
    console.log('server is running on the port!!!!');
})
