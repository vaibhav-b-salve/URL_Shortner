const express = require('express');
require("dotenv").config(); 
const path = require('path');
const dbConnection = require('./infra/db');
const urlRoute = require('./routes/url.route');
const userRoute = require('./routes/user.route');
const auth = require("./middlewares/auth.middleware")
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 3400;
const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/url",urlRoute);
app.use("/user",userRoute);

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"./views/home.html"));
})

app.get("/admin.html",auth.validateAdmin,(req,res)=>{
    res.sendFile(path.join(__dirname,"./views/admin.html"));
})

app.get("/user.html",auth.validateUser,(req,res)=>{
    res.sendFile(path.join(__dirname,"./views/user.html"));
})

app.get("/:id",(req,res)=>{
    const page = req.params.id;
    console.log("page :",page);
    if(page=="login.html")
    {
        res.sendFile(path.join(__dirname,"./views/login.html"));
    }else if(page=="register.html")
    {
        res.sendFile(path.join(__dirname,"./views/register.html"));
    }else if(page=="guest.html")
    {
        res.sendFile(path.join(__dirname,"./views/guest.html"));
    }else if(page=="home.html")
    {
        res.sendFile(path.join(__dirname,"./views/home.html"));
    }else{
        // res.sendFile(path.join(__dirname,"./views/home.html"));
        res.status(404).send("This page NOT found !")
     
    }
})

dbConnection();

app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`);
})