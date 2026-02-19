const mongoose = require('mongoose');
const connectedToDb = async()=>{
    try{
        await mongoose.connect(process.env.DB_URL);
        console.log('database connection is successfull!!!!');
        console.log('database connection is successfull!!!!');
    }catch(e){
        console.log(e)
    }
}

module.exports = connectedToDb;