const dotenv = require('dotenv');
dotenv.config(); // ✅ Load env variables first

const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const authrouter = require('./route/auth-route');
const connectedToDb = require('./database/db');
const fileRouter = require('./route/file-upload-route');

const app = express();
console.log(process.env.CLIENT_URL)

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: ["http://localhost:5174","http://localhost:5173"],
    credentials: true
}));
app.get('/',(req,res)=>res.send('api work successfully'))
app.use('/api/auth', authrouter);
app.use('/api',fileRouter);
// Database connection
connectedToDb();

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});