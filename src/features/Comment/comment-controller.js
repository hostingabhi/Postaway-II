import { ObjectId } from "mongodb";
import ApplicationError from "../../error-handler/applicationError.js";
import CommentRepository from "./comment-repository.js";

export default class CommentController{
    constructor(){
        this.commentRepository = new CommentRepository();
    }
    async AddComment(req,res,next){
        try{
            const NewComment = await this.commentRepository.addComment(new ObjectId(req.params.id),req.body.content);
            res.status(200).send(NewComment);
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something Went wrong")
        }
    }
    async GetComment(req,res,next){
        try{
            const getcomment = await this.commentRepository.getComment(new ObjectId(req.params.id));
            res.status(200).send(getcomment);
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something Went wrong")
        }
    }
    async UpdateComment(req,res,next){
        try{
            const updatecomment = await this.commentRepository.updateComment(new ObjectId(req.params.id),req.body.content);
            if(!updatecomment){
                return res.status(400).send("Comment not Found");
            }else{
                return res.status(200).send(updatecomment)
            }
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something Went wrong")
        }
    }
    async DeleteComment(req,res,next){
        try{
            const deletecomment = await this.commentRepository.deleteComment(req.params.id);
            if(!deletecomment){
                return res.status(400).send("Comment  not Found");
            }else{
                return res.status(200).send("Comment is Deleted Sucessfully")
            }

        }catch(err){
            console.log(err);
            throw new ApplicationError("Something Went wrong")
        }
    }
}