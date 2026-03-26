const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    originalURL:{
        type:String,
        required:true
    },
    shortURL:{
        type: String,
        required: true
    },
    click:{
        type: Number,
        required: true,
        default: 0
    }
})

const urlModel = mongoose.model("url",urlSchema);
module.exports = urlModel;