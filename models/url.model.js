const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    originalURL:{
        type:String,
        required:true
    },
    shortURL:{
        type: String,
        required: true
    }
})

const urlModel = mongoose.model("url",urlSchema);
module.exports = urlModel;