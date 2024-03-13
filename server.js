import "./env.js";
import express  from "express";
import { connectUsingMongoose } from "./src/config/mongoose-config.js";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import ApplicationError from "./src/error-handler/applicationError.js";
import userRouter from "./src/features/User/user-routes.js";
import postRouter from "./src/features/Post/post-routes.js";
import commentRouter from "./src/features/Comment/comment-routes.js";
import likeRouter from "./src/features/Like/like-routes.js";
import friendshipRouter from "./src/features/Friendship/friendship-routes.js";
import otpRouter from "./src/features/Otp/otp-routes.js";
import jwtAuth from "./src/middlewares/jwt-middleware.js";
const port = 8000;

const server = express();

server.use(cookieParser());
server.use(express.json());
//setup all the routes
server.use("/api/users",userRouter);
server.use("/api/posts",jwtAuth,postRouter);
server.use("/api/comments",jwtAuth,commentRouter);
server.use("/api/likes",jwtAuth,likeRouter);
server.use("/api/otp",jwtAuth,otpRouter);
server.use("/api/friends",jwtAuth,friendshipRouter);

//Default Gatewat
server.get("/",(req,res)=>{
    res.send("Welcome bro")
});
//Error handler middleware
server.use((err,req,res,next)=>{
    console.log(err);
    if(err instanceof mongoose.Error.ValidationError){
        res.status(400).send(err.message);
    }
    if(err instanceof ApplicationError){
        res.send(err.code).send(err.message);
    }
    res.status(500).send("Solve the Error then Try Again");
})

server.listen(port,()=>{
    console.log(`server is working on http://localhost:${port}`);
    connectUsingMongoose();
});