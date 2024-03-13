import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
    name:{type:String,maxLength:[25,"Name can't be grater then 25 charchter"]},
    email: {type: String, unique: true, required: true,
        match: [/.+\@.+\../, "Please enter a valid email"]
    },
    password:{type:String,required:true},
    gender:{type:String,enum:["Male","Female"]}
})