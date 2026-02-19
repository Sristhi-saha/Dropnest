const dotenv = require('dotenv');
dotenv.config(); // ✅ Load env variables first

const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const authrouter = require('./route/auth-route');
const connectedToDb = require('./database/db');

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));
app.get('/',(req,res)=>res.send('api work successfully'))
app.use('/api/auth', authrouter);

// Database connection
connectedToDb();

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});