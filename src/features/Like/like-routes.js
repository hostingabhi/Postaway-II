import express from 'express';
import { LikeController } from './like-controller.js';

const likeRouter = express.Router();
const likeController = new LikeController();

likeRouter.get("/:id",(req,res,next)=>{likeController.GetLikes(req,res,next)});
likeRouter.get("/toggle/:id",(req,res,next)=>{likeController.likeItem(req,res,next)});

export default likeRouter;