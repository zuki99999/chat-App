import mongoose from "mongoose";
import User from "./user.model.js";

const messageSchema = new mongoose.Schema(
    {
        senderId:{
            type:mongoose.Schema.Types.ObjectId,
            req:User,
            required:true,
        },
        reciverId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:User,
            required:true,
        },
        text:{
            type: String,
            required:function(){
                 this.type == "user"?true:false; 
            }
        },
        image:{
            type: String,
        },
    },{timestamps:true}
);

const Message = mongoose.model("Message", messageSchema);

export default Message;