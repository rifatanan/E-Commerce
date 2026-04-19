import type { Request, Response } from "express";
import Category from "./model";

export const createCategory = async(request: Request, response: Response ) => {
    try {
        const { name } = request.body as { name: string; };
        if(!name){
            response.status(400).json({message: "Category name is required"});
            return;
        }
    
        const createCategoryResponse = await Category.create({name});
        response.status(201).json(createCategoryResponse);
    } catch (error) {
        console.error("Error creating category: ", error);
        response.status(500).json({message: "Internal server error"});
    }
}

export const listCategories = async(request: Request, response: Response ) => {
    try{
        const listCategoriesResponse = await Category.find();
        response.status(200).json(listCategoriesResponse);
    }catch(error){
        console.error("Error getting List category:", error);
        response.status(500).json({message: "Internal server error"});
    }
}

export const updateCategory = async(request: Request, response: Response ) => {
    try{
        const { id } = request.params; 
        const { name , description } = request.body as { name: string; description: string; };
        if(!id){
            response.status(400).json({message: "Category name is required"});
            return;
        }
        const updateCategoryResponse = await Category.findByIdAndUpdate( 
            id,
            { name , description },
            { returnDocument: 'after' }
        );
        response.status(200).json(updateCategoryResponse);
    }catch(error){
        console.error("Error getting List category:", error);
        response.status(500).json({message: "Internal server error"});
    }
}

export const deleteCategory = async(request: Request, response: Response ) => {
    try{
        const { id } = request.params;
        if(!id){
            response.status(400).json({message: "Category id is required"});
            return;
        }
        const deleteCategoryResponse = await Category.deleteOne({_id: id });
        response.status(200).json(deleteCategoryResponse);
    }catch(error){
        console.error("Error getting List category:", error);
        response.status(500).json({message: "Internal server error"});
    }
}

export const findOrCreateCategory = async (name: string) => {
  let category = await Category.findOne({ name });

  if (!category) {
    category = await Category.create({ name });
  }

  return category._id;
};