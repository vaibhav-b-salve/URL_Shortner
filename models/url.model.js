const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    originalURL:{
        type:String,
        required:true
    },
    shortURL:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type:String
    }
})

const urlModel = mongoose.model("url",urlSchema);
module.exports = urlModel;