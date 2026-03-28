const user = require("../models/user.model");

const createUser = async (data) => {

    try {
        const newUser = await user.create({
            Name:data.name,
            Email:data.email,
            Password:data.password
        });
        if(newUser)
        {
            const response = {
                success:true
            }
            return response;
        }
      
    } catch (err) {
        console.log("User registration failed : ", err);
        const response = {
                success:false
            }
       return response;
    }
}

const finder = async(data) =>{
    let response ={}
    try{
        const target = await user.findOne({
            Email:data.email,
            Password:data.password
        });
        if(target)
        {
            response ={
            message:"User found",
            success:true
           }
        }else{
            response ={
            message:"User NOT found",
            success:false
           }
        }

    }catch(error)
    {
        response ={
            error:"Error in finding user !"
        }
        
    }
    return response;
}


module.exports = {
    createUser,
    finder
}

