import type { Request, Response } from "express";
import * as categoryService from "./service";

export const createCategory = async ( request: Request, response:Response ): Promise<void> => {
    await categoryService.createCategory(request, response);
}

export const listCategories = async ( request: Request, response:Response ): Promise<void> => {
    await categoryService.listCategories(request, response);
}

export const updateCategory = async ( request: Request, response:Response ): Promise<void> => {
    await categoryService.updateCategory(request, response);
}

export const deleteCategory = async ( request: Request, response:Response ): Promise<void> => {
    await categoryService.deleteCategory(request, response);
}