import mongoose from "mongoose";
import { PostSchema } from "./post-schema.js";
import ApplicationError from "../../error-handler/applicationError.js"

const PostModel = mongoose.model("Post",PostSchema);

export default class PostRepository{
    constructor(){
        this.collection = "Post"
    }
    async addPost(userId,imageUrl,caption){
        try{
            const newPost = PostModel(
            {userId: userId, // Assuming userId is a valid ObjectId
            imageUrl: imageUrl,
            caption: caption});
            console.log(newPost)
            return await newPost.save();
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something Went wrong")
        }
    }
    async getOnePost(id){
        try{
            return await PostModel.findById(id);
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something Went wrong")
        }
    }
    async getPostByUser(userId){
        try{
            return await PostModel.find({userId:userId});
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something Went wrong")
        }
    }
    async getAllPost(){
        try{
            return await PostModel.find();
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something Went wrong")
        }
    }
    async deletePost(postId){
        try{
            return await PostModel.findByIdAndDelete(postId);
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something Went wrong")
        }
    }
    async updatePost(postId,imageUrl,caption){
        try{
            let post = await PostModel.findById(postId);
            if(post){
                post.imageUrl = imageUrl;
                post.caption = caption;
                post.save();
                return post;
            }else{
                return null;
            }
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something Went wrong")
        }
    }
}