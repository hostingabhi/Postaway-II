import mongoose from "mongoose";
import OtpScheama from "./otp-schema.js";
import ApplicationError from "../../error-handler/applicationError.js"

const OtpModel = mongoose.model("Otp",OtpScheama);

export default class OtpRepository{
    constructor(){
        this.collection = "Otp"
    }
    async saveOtp(email,otp){
        try{
            
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something Went wrong")
        }
    }
    async verifyOtp(email,Otp){
        try{
                const user = await OtpModel.findOne({email});
                if(user && user.otp === Otp){
                    user.otp = null;
                    await user.save();
                    return true;
                }
                return false;
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something Went wrong")
        }
    }
}