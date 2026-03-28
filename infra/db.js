const mongoose = require('mongoose');


const connectDB = () =>{
    mongoose.connect(process.env.mongo)
    .then(()=>{
        console.log("DB connected successfully");
    })
    .catch(err=>{
        console.log("db error :",err);
    })
}

module.exports = connectDB;