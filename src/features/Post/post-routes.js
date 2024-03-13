import express from 'express';
import PostController from './post-controller.js';
import {upload} from "../../middlewares/fileupload-middleware.js"

const postRouter = express.Router();
const postController = new PostController();

postRouter.post('/',upload.single('imageUrl'),(req,res,next)=>{postController.AddPost(req,res,next)});
postRouter.get('/',(req,res,next)=>{postController.GetPostByUser(req,res,next)});
postRouter.get('/all',(req,res,next)=>{postController.GetAllPost(req,res,next)});
postRouter.get('/:id',(req,res,next)=>{postController.GetOnePost(req,res,next)});
postRouter.delete('/:id',(req,res,next)=>{postController.DeletePost(req,res,next)});
postRouter.put('/:id',upload.single('imageUrl'),(req,res,next)=>{postController.UpdatePost(req,res,next)});

export default postRouter;