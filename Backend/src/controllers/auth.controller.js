import { generateTokens } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudanary.js"


export const signup = async(req,res)=>{
    const {fullName,email,password} = req.body
    try{

        if(!password||!email||!fullName){
            return res.status(400).json({messagae:"something is missing"});
        }

        if(password.length<6){
            return res.status(400).json({messagae:"password must be at least 6 character"});
        }

        const user = await User.findOne({email});
        if(user) return res.status(400).join({message:"Email already exist"});
        const salt = await bcrypt.genSalt(10);
        const hashPashword = await bcrypt.hash(password,salt);

        const newUser = new User({
            fullName,
            email,
            password:hashPashword
        });

        if (newUser){

            // genera jwt?
            generateTokens(newUser._id,res);
            await newUser.save();

            res.status(201).json({
                _id:newUser._id,
                fullName:newUser.fullName,
                email:newUser.email,
                password:hashPashword
            });

        }else{
            return res.status(400).json({messagae:"invalid user"});
        }

    }catch(error){
        console.log(`Error:${error.message}`);
        res.status(500).json({messagae:"invalid server error"});
    }
}

export const login = async(req,res)=>{
    console.log("req>>>>",req.body);
    const {email , password} = req.body;
    try{
        if(!email || !password){
            return res.status(400).json({message:"something is messing"});
        }
        const user = await User.findOne({email});
        if(!user)return res.status(404).json({message:"invalid credintials"});

        const isPasswordCorrect =  await bcrypt.compare(password,user.password);

        if(!isPasswordCorrect)return res.status(404).json({message:"invalid username or password"});

        generateTokens(user._id,res);

        res.status(200).json({
            _id:user._id,
            fullName:user.fullName,
            email:user.email,
            profilePic:user.profilePic
        });

    }catch(error){
        console.log(`Error:${error.message}`)
    }
}

export const logout = (req,res)=>{
    try{
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message:"logout successful"});
    }catch(error){
        console.log(`Errror:${error}`);
    }
}

export const updateProfile = async(req,res)=>{
    try{

        const {profilePic} = req.body;
        const userId = req.user._id;

        if(!profilePic){
        res.status(400).json({message:"profile pic is required"});
        }

        const uploadResponse = cloudinary.uploader.upload(profilePic);

        const updatedUser =  await User.findByIdAndUpdate(userId,{profilePic:(await uploadResponse).secure_url,new:true});

        res.status(200).json(updatedUser);

    }catch(error){
        console.log(`Error:${error.message}`);
    }
}



export const checkAuth = async(req,res)=>{
    try{

        res.status(200).json(req.user);

    }catch(error){
        console.log(`Error:${error.message}`);
        res.status(500).json({message:"error checking user:("})
    }
}
