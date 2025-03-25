import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const  isAuthenticate = async(req,res,next)=>{
    try{
        const token = req.cookies.jwt;

        if(!token){
           return res.status(400).json({message:"unauthorized user -- no token"});
        }
        
        const decoded = jwt.verify(token,process.env.JWT_SECRET);

        if(!decoded){
            return res.status(400).json({message:"unauthorized user -- no token"});
        }

        const user = await User.findById(decoded.userId).select("-password");
        if(!user){
            return res.status(400).json({message:"no user found accourding to token"});
        }

        req.user = user;

        next();

    }catch(error){
        console.log(error);
        res.status(500).json({message:"internal server error"});
    }
}
