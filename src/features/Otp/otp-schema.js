import mongoose from "mongoose"

const OtpScheama = mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    otp:{
        type:Number
    }
})

export default OtpScheama;