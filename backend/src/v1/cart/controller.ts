import { Request, Response } from 'express';
import * as cartService from "./service";

export const createCart = async (request: Request, response: Response ): Promise<void> => {
    await cartService.createCart(request, response);
}

export const listCarts = async (request: Request, response: Response ): Promise<void> => {
    await cartService.listCarts(request, response);
}

export const getCartByUserId = async (request: Request, response: Response ): Promise<void> => {
    await cartService.getCartByUserId(request, response);
}

export const singleProduct = async (request: Request, response: Response ): Promise<void> => {
    await cartService.singleProduct(request, response);
}

export const userAllProduct = async (request: Request, response: Response ): Promise<void> => {
    await cartService.userAllProduct(request, response);
}

export const updateCart = async (request: Request, response: Response ): Promise<void> => {
    await cartService.updateCart(request, response);
}