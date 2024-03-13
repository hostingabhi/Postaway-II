import express from 'express';
import CommentController from './comment-controller.js';

const commentRouter = express.Router();
const commentController = new CommentController();

commentRouter.post('/:id',(req,res,next)=>{commentController.AddComment(req,res,next)});
commentRouter.get('/:id',(req,res,next)=>{commentController.GetComment(req,res,next)});
commentRouter.put('/:id',(req,res,next)=>{commentController.UpdateComment(req,res,next)});
commentRouter.delete('/:id',(req,res,next)=>{commentController.DeleteComment(req,res,next)});

export default commentRouter;