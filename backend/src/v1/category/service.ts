import type { Request, Response } from "express";
import Category from "./model";

export const createCategory = async(request: Request, response: Response ) => {
    try {
        const { name, description } = request.body as { name: string; description: string; };
        if(!name){
            return response.status(400).json({
                success: false,
                message: "Category name is required"
            });
        }
    
        const createCategoryResponse = await Category.create({name, description});
        return response.status(201).json({
            success: true,
            message: "Category created successfully.",
            data: createCategoryResponse
        });
    } catch (error) {
        return response.status(500).json({
            success: false,
            message: "Something went wrong in " + error
        });
    }
}

export const listCategories = async(request: Request, response: Response ) => {
    try{
        const listCategoriesResponse = await Category.find();
        return response.status(200).json({
            success: true,
            message: "Categories retrieved successfully.",
            data: listCategoriesResponse
        });
    }catch(error){
        return response.status(500).json({
            success: false,
            message: "Something went wrong in " + error
        });
    }
}

export const updateCategory = async(request: Request, response: Response ) => {
    try{
        const { id } = request.params; 
        const { name , description } = request.body as { name: string; description: string; };
        if(!id){
            return response.status(400).json({
                success: false,
                message: "Category id is required"
            });
        }
        const updateCategoryResponse = await Category.findByIdAndUpdate( 
            id,
            { name , description },
            { returnDocument: 'after' }
        );
        return response.status(200).json({
            success: true,
            message: "Category updated successfully.",
            data: updateCategoryResponse
        });
    }catch(error){
        return response.status(500).json({
            success: false,
            message: "Something went wrong in " + error
        });
    }
}

export const deleteCategory = async(request: Request, response: Response ) => {
    try{
        const { id } = request.params;
        if(!id){
            return response.status(400).json({
                success: false,
                message: "Category id is required"
            });
        }
        const deleteCategoryResponse = await Category.deleteOne({_id: id });
        return response.status(200).json({
            success: true,
            message: "Category deleted successfully.",
            data: deleteCategoryResponse
        });
    }catch(error){
        return response.status(500).json({
            success: false,
            message: "Something went wrong in " + error
        });
    }
}