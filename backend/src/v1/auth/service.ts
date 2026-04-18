import User from "./model";
import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import authConfigs from "../../configs/auth.config";

export const register = async(request: Request, response: Response ) =>{
    try {
        const { name, email, password } = request.body;

        const existingUser = await User.findOne({email});

        if(existingUser){
            return response.status(409).json({
                success: false,
                message: "User already exists. Please login.",
            })
        }

        const user = await User.create({name, email, password});
        
        return response.status(201).json({
            success: true,
            message: "User created successfully.",
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });

    } catch (error: any) {
        return response.status(500).json({
            success:false,
            message: "Something went wrong.",
            error: error.toString(),
        });
    }
}

export const login = async(request: Request, response: Response ) =>{
    try {
        const { email, password } = request.body;
        const user = await User.findOne({email});

        if(!user){
            return response.status(404).json({
                success:false,
                message:"Failed to login. Email or password is incorrect.",
            });
        }

        const isMatched = await bcrypt.compare(password, user.password);
        if(!isMatched){
            return response.status(401).json({
                success:false,
                message:"Failed to login. Email or password is incorrect.",
            });
        }

        const token = authConfigs.encodeToken(user.email, user.id.toString());
        response.cookie("user-token", token);

        return response.status(200).json({
            success:true,
            message:"Successfully logged in.",
            user:{
                id: user._id,
                email: user.email,
            },
            token,
        });

    } catch (error: any) {
        return response.status(500).json({
            success: false,
            message: "Something went wrong.",
            error: error.toString(),
        });
    }
}

export const getUserById = async(id:string) => {
    return await User.findById(id);
}
