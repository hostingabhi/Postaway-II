import mongoose from "mongoose";
import { userSchema } from "./user-schema.js";
import  ApplicationError from "../../error-handler/applicationError.js";

const UserModel = mongoose.model("User",userSchema)

export default class UserRepository{

    async signUp(user){
        try{
            const newUser = UserModel(user);
            return await newUser.save();
        }catch(err){
            console.log(err);
            if(err instanceof mongoose.Error.ValidationError){
                throw err;
            }else{
            throw new ApplicationError("Something Went wrong");
            }
        }
    }
    async signIn(email,password){
        try{
            return await UserModel.findOne({email,password});
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something Went wrong")
        }

    }
    async getDetails(id){
        try{
            return await UserModel.findById(id);
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something Went wrong")
        }

    }
    async getAllDetails(){
        try{
            return await UserModel.find();
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something Went wrong")
        }

    }
    async updateDetails(name,userID,password,gender){
        try{
            const user = await UserModel.findById(userID);
            if (!user) {
                return { success: false, message: 'User not found.' };
            }
            user.name = name;
            user.password = password;
            user.gender = gender;
            return await user.save();
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something Went wrong")
        }

    }
}