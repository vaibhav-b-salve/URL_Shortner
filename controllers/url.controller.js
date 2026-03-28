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
        console.log("response bhetla :",response)
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
module.exports = {
        urlShortner,
        redirect
    }