const urlModel = require("../models/url.model");

const createURL = async(data) =>{
    
    console.log("data :",data);
    try{
        const urlDB = await urlModel.create({
            originalURL: data.originalURL,
            shortURL: data.shortURL
        })
        const response = {
            short: data.shortURL
        };
        return response;
    }catch(error)
    {
        console.log("error in creating short url: ",error);
        const response = {
            error:"error in creating short url"
        }
        return response;
    }
}

const urlUser = async(data) =>{
    try{
        const urlDB = await urlModel.create({
            originalURL: data.originalURL,
            shortURL: data.shortURL,
            email: data.email
        })
        const response = {
            short: data.shortURL
        };
        return response;
    }catch(error)
    {
        console.log("error in creating short url: ",error);
        const response = {
            error:"error in creating short url"
        }
        return response;
    }
}



const urlFinder = async(data) =>{
    try{
        const target = await urlModel.findOne({
                    shortURL: data.shortURL,
                });
                if(!target)
                {
                    target ={error: "URL not found"}
                }
            return target;
        
    }catch(error)
    {
        console.log("error in finding url: ",error);
        const response = {
            error:"URL not found !"
        }
        return response;
    }
}

const findAll = async(data) =>{
    try{
        const target = await urlModel.find({
            email:data.email
        })
        const response = {
            users:target,
            sucess:true
        }
        return response;
    }catch(err)
    {
        console.log("22 :",err);
        const response = {
            sucess:false
        }
        return response;
    }
}

module.exports = {
    createURL,
    urlFinder,
    urlUser,
    findAll
}