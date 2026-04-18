import type { Request, Response } from "express";
import Band from "./model";

export const createBand = async(request: Request, response: Response ) => {
    try {
        const { name, description } = request.body as { name: string; description: string; };
        if(!name){
            return response.status(400).json({message: "Band name is required"});
        }
    
        const createBandResponse = await Band.create({ name, description });
        return response.status(201).json({
            success: true,
            message: "Band created successfully.",
            data: createBandResponse
        });
    } catch (error) {
        return response.status(500).json({
            success:false,
            message: "Something went wrong in "+error,
        });
    }
}

export const listBands = async(request: Request, response: Response ) => {
    try{
        const listBandsResponse = await Band.find();
        return response.status(200).json({
            success: true,
            message: "Bands retrieved successfully.",
            data: listBandsResponse
        });
    }catch(error){
        return response.status(500).json({
            success:false,
            message: "Something went wrong in "+error,
        });
    }
}

export const updateBand = async(request: Request, response: Response ) => {
    try{
        const { id } = request.params; 
        const { name , description } = request.body as { name: string; description: string; };
        if(!id){
            return response.status(400).json({
                success:false,
                message: "Band id is required"
            });
        }
        const updateBandResponse = await Band.findByIdAndUpdate( 
            id,
            { name , description },
            { returnDocument: 'after' }
        );
        return response.status(200).json({
            success: true,
            message: "Band updated successfully.",
            data: updateBandResponse
        });
    }catch(error){
        return response.status(500).json({
            success:false,
            message: "Something went wrong in "+error,
        });
    }
}

export const deleteBand = async(request: Request, response: Response ) => {
    try{
        const { id } = request.params;
        if(!id){
            return response.status(400).json({
                success:false,
                message: "Band id is required"
            });
        }
        const deleteBandResponse = await Band.deleteOne({_id: id });
        return response.status(200).json({
            success: true,
            message: "Band deleted successfully.",
            data: deleteBandResponse
    });
    }catch(error){
        return response.status(500).json({
            success:false,
            message: "Something went wrong in "+error,
        });
    }
}