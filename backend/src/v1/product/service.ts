import type { Request, Response } from "express";
import Product from "./model";
import { findOrCreateBand } from "../band/service";
import { findOrCreateCategory } from "../category/service";

interface CreateProductRequest {
    name: string;
    description: string;
    price: number;
    stock: number;
    thumbnail: string;
    ratings?: { average: number; count: number };
    images?: string[];
    category: string;
    brand: string;
}

export const createProduct = async(request: Request, response: Response ) => {
    try {
        const body = request.body as CreateProductRequest;
        
        const {
            name,
            description,
            price,
            stock,
            thumbnail,
            ratings = { average: 0, count: 0 },
            images = [],
            category,
            brand
        } = body;

        if(!name){
            response.status(400).json({message: "Product name is required"});
            return;
        }

        const findOrCreateBandResponse = await findOrCreateBand(brand);
        const findOrCreateCategoryResponse = await findOrCreateCategory(category);
    
        const createProductResponse = await Product.create({
            name,
            description,
            price,
            stock,
            thumbnail,
            ratings,
            images,
            category: findOrCreateCategoryResponse,
            brand: findOrCreateBandResponse
        });
        response.status(201).json(createProductResponse);
    } catch (error) {
        console.error("Error creating product: ", error);
        response.status(500).json({message: "Internal server error"});  
    }
}

export const listProducts = async(request: Request, response: Response ) => {
    try{
        const listProductsResponse = await Product.find();
        response.status(200).json(listProductsResponse);
    }catch(error){
        console.error("Error getting products:", error);
        response.status(500).json({message: "Internal server error"});
    }
}

export const updateProduct = async(request: Request, response: Response ) => {
    try{
        const { id } = request.params; 
        const { name , description } = request.body as { name: string; description: string; };
        if(!id){
            response.status(400).json({message: "Product name is required"});
            return;
        }
        const updateProductResponse = await Product.findByIdAndUpdate( 
            id,
            { name , description },
            { returnDocument: 'after' }
        );
        response.status(200).json(updateProductResponse);
    }catch(error){
        console.error("Error getting List Product:", error);
        response.status(500).json({message: "Internal server error"});
    }
}

export const deleteProduct = async(request: Request, response: Response ) => {
    try{
        const { id } = request.params;
        if(!id){
            response.status(400).json({message: "Product id is required"});
            return;
        }
        const deleteProductResponse = await Product.deleteOne({_id: id });
        response.status(200).json(deleteProductResponse);
    }catch(error){
        console.error("Error getting List Product:", error);
        response.status(500).json({message: "Internal server error"});
    }
}