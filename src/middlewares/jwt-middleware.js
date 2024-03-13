import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();

const jwtAuth = (req,res,next)=>{
    const {jwtToken} = req.cookies;
    // const token = req.headers['authorization'];
    if(!jwtToken){
        return res.status(401).send("Unauthorised Access");
    }
    try{
        const payload = jwt.verify(jwtToken,process.env.JWT_Key);
        console.log("Payload",payload);
        req.userID = payload._userID;
    } catch(err){
        // 4. return error.
        console.log(err);
        return res.status(401).send('Unauthorized2');
    }
    next();
}

export default jwtAuth;