const express = require('express');
const path = require('path');
const dbConnection = require('./infra/db');
const urlRoute = require('./routes/url.route');
const PORT = process.env.PORT || 3400;
const app = express();
app.use(express.json());
app.use("/url",urlRoute);

app.get("/",(req,res)=>{
    // res.send("Welcome to URL shortner");
    res.sendFile(path.join(__dirname,"./views/index.html"));
})


dbConnection();

app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`);
})