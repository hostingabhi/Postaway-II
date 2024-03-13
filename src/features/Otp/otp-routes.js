import express from 'express';
import OtpController from './otp-controller.js';

const otpRouter = express.Router();
const otpController = new OtpController();

otpRouter.post('/send',(req,res,next)=>{otpController.SendOtp(req,res,next)});
otpRouter.post('/verify',(req,res,next)=>{otpController.VerifyOtp(req,res,next)});

export default otpRouter;