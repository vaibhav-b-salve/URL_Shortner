const express = require('express');
require("dotenv").config(); 
const path = require('path');
const dbConnection = require('./infra/db');
const urlRoute = require('./routes/url.route');
const PORT = process.env.PORT || 3400;
const app = express();
app.use(express.json());
app.use("/url",urlRoute);

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"./views/home.html"));
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
    }else{
        res.sendFile(path.join(__dirname,"./views/home.html"));
    }
})

dbConnection();

app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`);
})