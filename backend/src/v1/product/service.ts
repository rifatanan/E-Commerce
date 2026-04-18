import type { Request, Response } from "express";
import Product from "./model";

export const createProduct = async(request: Request, response: Response ) => {
    try {
        const { name, description } = request.body as { name: string; description: string; };
        if(!name){
            return response.status(400).json({
                success: false,
                message: "Product name is required"
            });
        }
    
        const createProductResponse = await Product.create({name, description});
        return response.status(201).json({
            success: true,
            message: "Product created successfully.",
            data: createProductResponse
        });
    } catch (error) {
        return response.status(500).json({
            success: false,
            message: "Something went wrong in " + error
        });
    }
}

export const listProducts = async(request: Request, response: Response ) => {
    try{
        const listProductsResponse = await Product.find();
        return response.status(200).json({
            success: true,
            message: "Products retrieved successfully.",
            data: listProductsResponse
        });
    }catch(error){
        return response.status(500).json({
            success: false,
            message: "Something went wrong in " + error
        });
    }
}

export const updateProduct = async(request: Request, response: Response ) => {
    try{
        const { id } = request.params; 
        const { name , description } = request.body as { name: string; description: string; };
        if(!id){
            return response.status(400).json({
                success: false,
                message: "Product id is required"
            });
        }
        const updateProductResponse = await Product.findByIdAndUpdate( 
            id,
            {name , description},
            { returnDocument: 'after' }
        );
        return response.status(200).json({
            success: true,
            message: "Product updated successfully.",
            data: updateProductResponse
        });
    }catch(error){
        return response.status(500).json({
            success: false,
            message: "Something went wrong in " + error
        });
    }
}

export const deleteProduct = async(request: Request, response: Response ) => {
    try{
        const { id } = request.params;
        if(!id){
            return response.status(400).json({
                success: false,
                message: "Product id is required"
            });
            return;
        }
        const deleteProductResponse = await Product.deleteOne({_id: id });
        return response.status(200).json({
            success: true,
            message: "Product deleted successfully.",
            data: deleteProductResponse
        });
    }catch(error){
        return response.status(500).json({
            success: false,
            message: "Something went wrong in " + error
        });
    }
}

export const getProductById = async(id:string ) => {
    return await Product.findById(id);
}