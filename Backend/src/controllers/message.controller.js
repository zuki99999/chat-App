import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudanary from "../lib/cloudanary.js";

export const getUserForSidebar = async (req,res)=>{
    try{

        const loggInUserId = req.user._id;
        const filteredUser = await User.findById({_id:{$ne:loggInUserId}}).select("-password");

        res.status(200).json(filteredUser);

    }catch(error){
        console.log(`error form getUserFromSlide: ${error}`);
        res.status(500).json(`Error: internal server error`);
    }
}

export const getMessages = async (req,res)=>{
    try{
        const {id:userToChatId} = req.params;
        const myId = req.user._id;

        const message = await Message.find({
            $or:[
                {senderId:myId,reciverId:userToChatId},
                {reciverId:userToChatId,senderId:myId}
            ]
        });
        res.status(200).json(message);
    }catch(error){
        console.log(`ERROR form getMessage:${error.message}`);
        res.status(500).json({message:`${error.message}`});
    }
}


export const sendMessage = ()=>{
    try{

        const {text , image} = req.body;
        const {id:reciverId} = req.prams;

        const senderId = req.user._id;

        let imageUrl;
        if(imageUrl){
            const uploadResponse = cloudanary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = Message({
            senderId,
            reciverId,
            text,
            image:imageUrl
        });

         newMessage.save();//await


         //todo:realtime finctionality gors here;;;;;

         res.satatus(201).json(newMessage);

    }catch(error){
        console.log(error.message);
        res.satatus(500).json({error:"send message=>internal server error"});
    }
}

