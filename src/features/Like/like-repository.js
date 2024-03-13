import mongoose from "mongoose";
import { likeSchema } from "./like-schema.js";
import { ObjectId } from "mongodb";
import ApplicationError from "../../error-handler/applicationError.js"

const LikeModel = mongoose.model("Like",likeSchema)
export default class LikeRepository{
    async getLike(id){
        return await LikeModel.find({likeable:id})
    }
    async deleteLike(id){
        try{
            return await LikeModel.findOneAndDelete({likeable:id});
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something Went wrong")
        }
    }
    async likeComment(id){
        try{
            const newLike = new LikeModel({
                likeable:new ObjectId(id),
                on_model:'Comment'
            })
            await newLike.save();
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something Went wrong")
        }
    }
    async likePost(id){
        try{
            const newLike = new LikeModel({
                likeable:new ObjectId(id),
                on_model:'Post'
            });
            await newLike.save();
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something Went wrong")
        }
    }
}