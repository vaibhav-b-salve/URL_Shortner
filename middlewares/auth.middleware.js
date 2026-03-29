const jwt = require('jsonwebtoken');

const sec = process.env.secret_key;
function validateUser(req, res, next) {
    const token = req.cookies.token;
    if (!token) return res.redirect("/home.html");
    jwt.verify(token, sec, (err, user) => {
        if (err) {
            res.clearCookie("token", {
                httpOnly: true,
                secure: true,
                sameSite: "strict"
            });

            return res.sendStatus(403);
        };
        req.user = user; 
        if(user.email == process.env.admin_email)
        {
          res.clearCookie("token", {
                httpOnly: true,
                secure: true,
                sameSite: "strict"
            });
            return res.sendStatus(403);
        }
        console.log("data from token:", user);
        console.log("user.email :", user.email);
        console.log("password :",user.password);
        next();
    });
}

function validateAdmin(req, res, next) {
    const token = req.cookies.token;
    if (!token) return res.redirect("/register");

    jwt.verify(token, sec, (err, user) => {
        if (err) {
            res.clearCookie("token", {
                httpOnly: true,
                secure: true,
                sameSite: "strict"
            });

            return res.sendStatus(403);
        };
        req.user = user;
         if(user.email != process.env.admin_email)
        {
          res.clearCookie("token", {
                httpOnly: true,
                secure: true,
                sameSite: "strict"
            });
            return res.sendStatus(403);
        }
        console.log("data from token:", user);
        console.log("user.email :", user.email);
        if(user.email==process.env.admin_email)
        {
            next();
        }else{
           
            res.status(403).redirect("/login.html");
        }
    });
}

module.exports ={
  validateUser,
  validateAdmin
}