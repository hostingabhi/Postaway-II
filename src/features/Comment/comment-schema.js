import mongoose from "mongoose";

export const commentSchema = new mongoose.Schema({
    postId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post'
    },
    content:{
        type:String
    }
})