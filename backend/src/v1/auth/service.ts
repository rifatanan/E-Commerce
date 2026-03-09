import User from "./model";
import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import authConfigs from "../../configs/auth.config";

export const register = async(request: Request, response: Response ) =>{
    try {
        const { name, email, password } = request.body;
        if(!name || !email || !password){
            return response.status(400).json({
                success: false,
                message: "All fields are required.",
            })
        }

        const exituser = await User.findOne({email});

        if(exituser){
            return response.status(201).json({
                success: true,
                message: "User already exit. please login",
            })
        }

        const user = await User.create({name, email, password});
        
        response.status(201).json({
            success: true,
            message: "User created successfully.",
            data: user
        })

    } catch (error) {
        response.status(500).json({
            success:false,
            message: "Something went wrong in"+error,
        })
    }
}

export const login = async(request: Request, response: Response ) =>{
    try {
        const { email, password } = request.body;
        const user = await User.findOne({email});

        if(!user){
            return response.status(404).json({
                success:false,
                message:"Falied to login."
            })
        }

        const isMatched = await bcrypt.compare(password, user?.password);
        if(!isMatched){
            return response.status(404).json({
                success:false,
                message:"Wrong Password."
            })
        }else{
            const token = authConfigs.encodeToken(user?.email, user?.id.toString());
            response.cookie("user-token", token);

            response.status(200).json({
                success:true,
                message:"Successfully loged in.",
                user:{
                    id:user?._id,
                    email: user?.email,
                },
                token: token
            })
        }

    } catch (error: any) {
        response.status(500).json({
            success: false,
            message: "Something went wrong.",
            error: error.toString(),
        })
    }
}

const service = {
    register,
    login
}

export default service;