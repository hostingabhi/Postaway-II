import mongoose from "mongoose";

export const PostSchema = new mongoose.Schema({
    userId: 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
    imageUrl:{type:String,required:true},
    caption:{type:String,required:true}
})