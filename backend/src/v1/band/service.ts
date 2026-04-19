import type { Request, Response } from "express";
import Band from "./model";

export const createBand = async(request: Request, response: Response ) => {
    try {
        const { name } = request.body as { name: string;  };
        if(!name){
            response.status(400).json({message: "Band name is required"});
            return;
        }
    
        const createBandResponse = await Band.create({ name });
        response.status(201).json(createBandResponse);
    } catch (error) {
        console.error("Error creating band: ", error);
        response.status(500).json({message: "Internal server error"});
    }
}

export const listBands = async(request: Request, response: Response ) => {
    try{
        const listBandsResponse = await Band.find();
        response.status(200).json(listBandsResponse);
    }catch(error){
        console.error("Error getting Band category:", error);
        response.status(500).json({message: "Internal server error"});
    }
}

export const updateBand = async(request: Request, response: Response ) => {
    try{
        const { id } = request.params; 
        const { name , description } = request.body as { name: string; description: string; };
        if(!id){
            response.status(400).json({message: "Band name is required"});
            return;
        }
        const updateBandResponse = await Band.findByIdAndUpdate( 
            id,
            { name , description },
            { returnDocument: 'after' }
        );
        response.status(200).json(updateBandResponse);
    }catch(error){
        console.error("Error getting List Band:", error);
        response.status(500).json({message: "Internal server error"});
    }
}

export const deleteBand = async(request: Request, response: Response ) => {
    try{
        const { id } = request.params;
        if(!id){
            response.status(400).json({message: "Band id is required"});
            return;
        }
        const deleteBandResponse = await Band.deleteOne({_id: id });
        response.status(200).json(deleteBandResponse);
    }catch(error){
        console.error("Error getting List Band:", error);
        response.status(500).json({message: "Internal server error"});
    }
}

export const findOrCreateBand = async (name: string) => {
    let band = await Band.findOne({ name });

    if (!band) {
        band = await Band.create({ name });
    }

    return band._id;
};