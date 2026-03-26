const mongoose = require('mongoose');

const connectDB = () =>{
    mongoose.connect("mongodb://127.0.0.1:27017/URL")
    .then(()=>{
        console.log("DB connected successfully");
    })
    .catch(err=>{
        console.log("db error :",err);
    })
}

module.exports = connectDB;