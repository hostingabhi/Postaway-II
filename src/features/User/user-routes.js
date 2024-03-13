import express from 'express';
import UserController from './user-controller.js';
import jwtAuth from '../../middlewares/jwt-middleware.js'

const userRouter = express.Router();
const userController = new UserController();

userRouter.post('/signup',(req,res,next)=>{userController.SignUp(req,res,next)});
userRouter.post('/signin',(req,res,next)=>{userController.SignIn(req,res,next)});
userRouter.get('/logout',(req,res,next)=>{userController.Logout(req,res,next)});
userRouter.get('/logout-all-devices',(req,res,next)=>{userController.LogoutAll(req,res,next)});
userRouter.get('/get-details/:id',(req,res,next)=>{userController.GetDetail(req,res,next)});
userRouter.get('/get-all-details',(req,res,next)=>{userController.GetAllDetail(req,res,next)});
userRouter.put('/update-details/:id',jwtAuth,(req,res,next)=>{userController.UpdateDetail(req,res,next)});

export default userRouter;