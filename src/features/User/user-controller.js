import  ApplicationError  from "../../error-handler/applicationError.js";
import UserRepository from "./user-repository.js";
import jwt from "jsonwebtoken";

export default class UserController {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async SignUp(req, res, next) {
        try {
            const user = await this.userRepository.signUp(req.body);
            res.status(201).send(user);
        } catch (err) {
            console.log(err);
            throw new ApplicationError("Something Went wrong")
        }
    }
    async SignIn(req, res, next) {
        try {
            const user = await this.userRepository.signIn(req.body.email, req.body.password);
            if (!user) {
                return res.status(400).send("Incorrect Credentials")
            } else {
                const token = jwt.sign({ _userID: user._id }, process.env.JWT_Key,
                    {expiresIn:"1h"});
                return res.cookie("jwtToken",token,{ maxAge: 1 * 60 * 60 * 1000, httpOnly: true }).status(200).send(token);
            }

        } catch (err) {
            console.log(err);
            throw new ApplicationError("Something Went wrong")
        }
    }
    async Logout(req, res, next) {
        try {
            res.clearCookie("jwtToken")
            res.json({ success: true, msg: "Logout Sucessfull" });
        } catch (err) {
            console.log(err);
            throw new ApplicationError("Something Went wrong")
        }
    }
    async LogoutAll(req, res, next) {
        try {
            res.clearCookie("jwtToken")
            res.json({ success: true, msg: "Logout Sucessfull" });
        } catch (err) {
            console.log(err);
            throw new ApplicationError("Something Went wrong")
        }
    }
    async GetDetail(req, res, next) {
        try {
            const user = await this.userRepository.getDetails(req.params.id);
            return res.status(200).send(user);
        } catch (err) {
            console.log(err);
            throw new ApplicationError("Something Went wrong")
        }
    }
    async GetAllDetail(req, res, next) {
        try {
            const users = await this.userRepository.getAllDetails();
            return res.status(200).send(users);
        } catch (err) {
            console.log(err);
            throw new ApplicationError("Something Went wrong")
        }
    }
    async UpdateDetail(req, res, next) {
        try {
            const userId = req.params.id;
            const{name,password,gender}=req.body;
            const updateuser = await this.userRepository.updateDetails(name, userId, password, gender);
            return res.status(200).send(updateuser);
        } catch (err) {
            console.log(err);
            throw new ApplicationError("Something Went wrong")
        }
    }

}