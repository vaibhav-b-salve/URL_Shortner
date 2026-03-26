const url = require('../models/url.model');

const urlShortner = async (req, res) => {
    const body = req.body;
    console.log("long url :", body.url);
    const shortURL = Math.random().toString(36).substring(2, 8);
    try {
        const urlDB = await url.create({
            originalURL: body.url,
            shortURL: shortURL
        })
        res.send({
            short: shortURL
        });

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
        const target = await url.findOne({
            shortURL: body,
        });

        console.log("log :" )

        if (target) {
            console.log("correct")
            return res.redirect(target.originalURL)
            
            // res.send({
            //     target: target.originalURL
            // })

        }
    }catch(err) {
        console.log("2nd api error :",err)
            res.send({
                error: "mongo db error"
            })
        }
}
module.exports = {
        urlShortner,
        redirect
    }