import express from 'express';
import FriendshipController from './friendship-controller.js';

const friendshipRouter = express.Router();
const friendshipController = new FriendshipController();

friendshipRouter.get('/get-friends/:id',(req,res,next)=>{friendshipController.GetFriends(req,res,next)});
friendshipRouter.get('/get-pending-requests',(req,res,next)=>{friendshipController.GetPendingRequest(req,res,next)});
friendshipRouter.get('/toggle-friendship/:id',(req,res,next)=>{friendshipController.ToggleFriendship(req,res,next)});
friendshipRouter.get('/response-to-request/:id',(req,res,next)=>{friendshipController.RespondToRequest(req,res,next)});

export default friendshipRouter;