import ApplicationError from "../../error-handler/applicationError.js";
import { ObjectId } from "mongodb";
import LikeRepository from "./like-repository.js";

export class LikeController{
    constructor(){
        this.likeRepository = new LikeRepository();
    }
    async GetLikes(req,res,next){
        try{
            const likes = await this.likeRepository.getLike(req.params.id);
            if(likes == []){
                return res.status(400).send("Id not found")
            }else{
                return res.status(200).send(likes)
            }
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something Went wrong")
        }
    }
    async likeItem(req,res,next){
        try{
            const id = req.params.id;
            const type = req.query.type;
            if(type!='Comment' && type!='Post'){
                return res.status(400).send("type is Invalid");
            }

            if(type=='Comment'){
                const like = await this.likeRepository.deleteLike(id)
                if(!like){
                    await this.likeRepository.likeComment(id);
                    return res.status(200).send("Comment Likes Successfully");
                }else{
                    return res.status(200).send("Comment Dislikes Successfully");
                }
            }else{
                const like = await this.likeRepository.deleteLike(id)
                if(!like){
                    await this.likeRepository.likePost(id);
                    return res.status(200).send("Post Likes Successfully");
                }else{
                    return res.status(200).send("Post Dislikes Successfully");
                }
            }
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something Went wrong")
        }
    }
}