import mongoose from "mongoose"
import friendshipSchema from "./friendship-schema.js"
import ApplicationError from "../../error-handler/applicationError.js";

const FriendshipModel = mongoose.model("Friendship",friendshipSchema);

export default class FriendshipRepository{
    async getFriends(userID){
        try{
            return await FriendshipModel.find({userId:userID,status:'accepted'});
            
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something Went wrong")
        }
    }
    async getPendingRequest(userID){
        try{
            return await FriendshipModel.find({friendId:userID,status:'Pending'})
            
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something Went wrong")
        }
    }
    async toggleFriendship(userID,friendID){

        try{
        const friendship = await FriendshipModel.findOne({userId:userID,friendId:friendID});
        console.log(friendship);
        if(friendship){
            friendship.status = friendship.status === 'Accepted' ? 'Rejected' : 'Accepted';
        }else{
            const newFriendship = new FriendshipModel({userId:userID,friendId:friendID,status:'Pending'});
            await newFriendship.save();
        }
            
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something Went wrong")
        }
    }
    async respondToRequest(userID,friendID){
        try{
            console.log("userid",userID)
            console.log("friendId",friendID)
            const friendship = await FriendshipModel.findOne({userId:friendID,friendId:userID,status:"Pending"});
            console.log(friendship)
            if (friendship){
                friendship.status = 'Accepted';
                await friendship.save();
            }else{
                return null;
            }
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something Went wrong")
        }
    }
}