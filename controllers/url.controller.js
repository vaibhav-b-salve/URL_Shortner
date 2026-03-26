const url = require('../models/url.model');

const urlShortner = async(req,res) =>{
    const body = req.body;
    console.log("long url :",body.url);
    const shortURL =  Math.random().toString(36).substring(2, 8);
    try{
        const urlDB = await url.create({
            originalURL : body.url,
            shortURL : shortURL,
            click : 0
        })
        res.send({
            short:shortURL
        });

    }catch(err)
    {
        console.log("db error :",err);
        res.send({
            error : "unable to process your request !"
        })
    }
   
}

module.exports ={
    urlShortner
}