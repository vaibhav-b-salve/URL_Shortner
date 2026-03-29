const url = require('../services/url.services');

const urlShortner = async (req, res) => {
    const body = req.body;
    console.log("long url :", body.url);
    const shortURL = Math.random().toString(36).substring(2, 8);

    try {
        const data = {
            originalURL: body.url,
            shortURL: shortURL
        }
        const response = await url.createURL(data);
        res.send(response);

    } catch (err) {
        console.log("db error :", err);
        res.send({
            error: "unable to process your request !"
        })
    }

}

const urlShortnerUser = async (req, res) => {
    const body = req.body;
    console.log("long url :", body.url);
    const shortURL = Math.random().toString(36).substring(2, 8);
    console.log
    try {
        const data = {
            originalURL: body.url,
            shortURL: shortURL,
            email:req.user.email
        }
        const response = await url.urlUser(data);
        
        res.send(response);

    } catch (err) {
        console.log("db error :", err);
        res.send({
            error: "unable to process your request !"
        })
    }

}


const redirect = async (req, res) => {
    const body = req.params.id;
    console.log("redirect : ", body);
    try {
        const data = {
            shortURL: body,
        };
        const target = await url.urlFinder(data);

        if (!target.error) {
            console.log("correct")
            return res.redirect(target.originalURL)
        }else{
            res.send(target.error);
        }
    }catch(err) {
        console.log("2nd api error :",err)
            res.send({
                error: "mongo db error"
            })
        }
}

const getURL = async(req,res) =>{
    const data = {
        email:req.user.email
    }

    try{
        const target = await url.findAll(data);
        if(target.sucess)
        {
            res.send(target);
        }else{
            console.log("11 :",target)
            res.send({
            error:"Failed to fetch url!",
            sucess:false
        })
        }
    }catch(err)
    {
         console.log("12 :",err)
        res.send({
            error:"Failed to fetch url!",
            sucess:false
        })
    }
}
module.exports = {
        urlShortner,
        redirect,
        urlShortnerUser,
        getURL
    }