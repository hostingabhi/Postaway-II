import mongoose from "mongoose";

export const likeSchema = new mongoose.Schema({
    likeable:{
        type:mongoose.Schema.Types.ObjectId,
        refPath:'on_model'
    },
    on_model:{
        type:String,
        enum:['Post','Comment']
    }
})