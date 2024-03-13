import mongoose, { mongo } from "mongoose";
import dotenv from "dotenv";

dotenv.config();


export const connectUsingMongoose = async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("The MongoDB Database is Paired");
    }catch(err){
        console.log("Error while connecting to mongodb database",err);
        
    }
}
