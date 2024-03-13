import { ObjectId } from "mongodb";
import ApplicationError from "../../error-handler/applicationError.js";
import PostRepository from "./post-repository.js";


export default class PostController{
    constructor(){
        this.postRepository = new PostRepository();
    }
    async AddPost(req,res,next){
        try{
            const userId = new ObjectId(req.userID);
            const newPost = await this.postRepository.addPost(userId,req.file.filename,req.body.caption);
            res.status(200).send(newPost);
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something Went wrong")
        }
    }
    async GetOnePost(req,res,next){
        try{
            const post = await this.postRepository.getOnePost(req.params.id);
            if(!post){
                return res.status(400).send("Post not Found");
            }else{
                return res.status(200).send(post)
            }
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something Went wrong")
        }
    }
    async GetPostByUser(req,res,next){
        try{
            const post = await this.postRepository.getPostByUser(new ObjectId(req.userID));
            console.log(post);
            if(!post){
                return res.status(400).send("this user have no post");
            }else{
                return res.status(200).send(post)
            }
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something Went wrong")
        }
    }
    async GetAllPost(req,res,next){
        try{
            const posts = await this.postRepository.getAllPost();
            return res.status(200).send(posts)
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something Went wrong")
        }
    }
    async DeletePost(req,res,next){
        try{
            const post = await this.postRepository.deletePost(req.params.id);
            if(!post){
                return res.status(400).send("Post not Found");
            }else{
                return res.status(200).send("Post is Deleted Successfully")
            }
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something Went wrong")
        }
    }
    async UpdatePost(req,res,next){
        try{
            const updatePost = await this.postRepository.updatePost(req.params.id,req.file.filename,req.body.caption);
            if(!updatePost){
                return res.status(400).send("Post not Found")
            }else{
                return res.status(200).send(updatePost)
            }
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something Went wrong")
        }
    }
}