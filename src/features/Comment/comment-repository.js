import mongoose from "mongoose";
import { commentSchema } from "./comment-schema.js";
import ApplicationError from "../../error-handler/applicationError.js"


const CommentModel = mongoose.model("Comment", commentSchema);

export default class CommentRepository {
    constructor() {
        this.collection = "Comment"
    }
    async addComment(postID,content) {
        try {
                const newComment = CommentModel(
                    {
                        postId:postID,
                        content:content
                    }
                )
                return await newComment.save();
        } catch (err) {
            console.log(err);
            throw new ApplicationError("Something Went wrong")
        }
    }
    async getComment(postID) {
        try {
                return await CommentModel.find({postId:postID});
        } catch (err) {
            console.log(err);
            throw new ApplicationError("Something Went wrong")
        }
    }
    async updateComment(commentID,content) {
        try {
            let comment = await CommentModel.findById(commentID);
            if(comment){
                comment.content = content;
                comment.save();
                return comment;
            }else{
                return null;
            }
        } catch (err) {
            console.log(err);
            throw new ApplicationError("Something Went wrong")
        }
    }
    async deleteComment(commentID) {
        try {
                return await CommentModel.findByIdAndDelete(commentID);
        } catch (err) {
            console.log(err);
            throw new ApplicationError("Something Went wrong")
        }
    }
}