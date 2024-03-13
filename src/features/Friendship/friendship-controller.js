
import { ObjectId } from "mongodb";
import ApplicationError from "../../error-handler/applicationError.js";
import FriendshipRepository from "./friendship-repository.js";


export default class FriendshipController{
    constructor(){
        this.friendshipRepository = new FriendshipRepository();
    }
    async GetFriends (req,res,next){
        try{
            const friends = await this.friendshipRepository.getFriends(req.params.id);
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something Went wrong")
        }
    
    }
    async GetPendingRequest(req,res,next){
        try{
            const PendingRequest = await this.friendshipRepository.getPendingRequest(req.userID);
            res.status(200).send(PendingRequest);
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something Went wrong")
        }
    }
    async ToggleFriendship(req,res,next){
        try{

            await this.friendshipRepository.toggleFriendship(req.userID,req.params.id);
            res.status(200).send('Friendship toggle successfully')
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something Went wrong")
        }
    }
    async RespondToRequest(req,res,next){
        try{
            
            const responde = await this.friendshipRepository.respondToRequest(new ObjectId(req.userID),new ObjectId(req.params.id));
            if(!responde){
                res.status(400).send('Friendship Request not found')
                
            }else{

                res.status(200).send('Friendship request Accepted')
            }
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something Went wrong")
        }
    }
}