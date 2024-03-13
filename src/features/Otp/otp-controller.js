import ApplicationError from "../../error-handler/applicationError.js";
import OtpRepository from "./otp-repository.js";
import otpGenrator from 'otp-generator';

export default class OtpController{
    constructor(){
        this.otpRepository = new OtpRepository();
    }
    async SendOtp(req,res,next){
        try{
            const {email}= req.body;
            const otp =  otpGenrator.generate(6,{ lowerCaseAlphabets: false, upperCaseAlphabets : false, specialChars : false })
            await this.otpRepository.saveOtp(email,otp);
            res.status(200).send(otp+" is the OTP for your POSTAWAY-II account. DO NOT SHARE OTP WITH ANYONE. POSTAWAY-II never calls to verify it.")
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something Went wrong")
        }
    }
    async VerifyOtp(req,res,next){
        try{
            const validOtp = await this.otpRepository.verifyOtp(req.body.email,req.body.otp);
            if(!validOtp){
                res.status(200).send("Otp Verified")
            }else{
                res.status(200).send("Invalid Otp please enter a valid otp")
            }   
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something Went wrong")
        }
    }
}