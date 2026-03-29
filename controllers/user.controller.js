const user = require("../services/user.services")
const jwt = require("jsonwebtoken");
const sec = process.env.secret_key;
const admin = {
    email:process.env.admin_email,
    password:process.env.admin_password
}
const register = async(req,res) =>{
    const body = req.body;
    const data = {
        name:body.name,
        email:body.email,
        password:body.password
    }
    
    const response = await user.finder(data);
    if(!response.success)
    {
    
        const target = await user.createUser(data);
        if(target.success)
        {
            try{
                    const token = jwt.sign({ email: data.email }, sec, { expiresIn: "5h" });
                    res.cookie("token", token, {
                        httpOnly: true,               
                        secure: false,                 
                        sameSite: "strict",        
                    });
                    res.send({message:"User registered successfully",
                        success:true
                    });
            }catch(error)
            {
                 res.send({message:"User registration Failed",
                            success:false
                        });
            }
        }
    }else{
      
        res.send({
            success:false,
            message:"User already exist !"
        })
    }
}


const login = async(req,res) =>{
    const body = req.body;
    if(body.email==admin.email && body.password==admin.password)
    {
        const token = jwt.sign({ email: body.email}, sec, { expiresIn: "5h" });

       
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,                  
            sameSite: "strict",             
        });
       
        res.send({success:true,role:"admin"});
    }else{
        const response = await user.finder(body);
        if(response.success)
        {
            const token = jwt.sign({ email: body.email }, sec, { expiresIn: "5h" });

      
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,                  
            sameSite: "strict",             
        });
        res.send({success:true,role:"user"});
        }else{
            res.send({success:false,message:"User NOT found !"});
        }
    }
}

const getUser = async(req,res) =>{
    try{
        const target = await user.findUser();
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

const logout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            path: "/"
        });

        return res.status(200).json({
            success: true,
            message: "Logged out successfully"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Logout failed"
        });
    }
};
module.exports = {
    register,
    login,
    getUser,
    logout
}