import type { Request, Response } from "express";
import Band from "./model";

export const createBand = async(request: Request, response:Response) => {
    try {
        const { name, description } = request.body as { name: string; description: string; };
        if(!name){
            response.status(400).json({message: "Band name is required"});
            return;
        }
    
        const band = await Band.create({name, description});
        response.status(201).json(band);
    } catch (error) {
        console.error("Error creating category: ", error);
        response.status(500).json({message: "Internal server error"});
    }
}

export const listBands = async(request: Request, response:Response) => {
    try{
        const listBand = await Band.find();
        response.status(200).json(listBand);
    }catch(error){
        console.error("Error getting Band category:", error);
        response.status(500).json({message: "Internal server error"});
    }
}

export const updateBand = async(request: Request, response:Response) => {
    try{
        const { id } = request.params; 
        const { name , description } = request.body as { name: string; description: string; };
        if(!id){
            response.status(400).json({message: "Band name is required"});
            return;
        }
        const listBand = await Band.findByIdAndUpdate( 
            id,
            {name , description},
            { returnDocument: 'after' }
        );
        response.status(200).json(listBand);
    }catch(error){
        console.error("Error getting List Band:", error);
        response.status(500).json({message: "Internal server error"});
    }
}

export const deleteBand = async(request: Request, response:Response) => {
    try{
        const { id } = request.params;
        if(!id){
            response.status(400).json({message: "Band id is required"});
            return;
        }
        const listBand = await Band.deleteOne({_id: id });
        response.status(200).json(listBand);
    }catch(error){
        console.error("Error getting List Band:", error);
        response.status(500).json({message: "Internal server error"});
    }
}