import type { Request, Response } from "express";
import * as productService from "./service";

export const createProduct = async (request: Request, response: Response ): Promise<void> => {
    await productService.createProduct(request, response);
}

export const listProducts = async (request: Request, response: Response ): Promise<void> => {
    await productService.listProducts(request, response);
}

export const updateProduct = async (request: Request, response: Response ): Promise<void> => {
    await productService.updateProduct(request, response);
}

export const deleteProduct = async (request: Request, response: Response ): Promise<void> => {
    await productService.deleteProduct(request, response);
}