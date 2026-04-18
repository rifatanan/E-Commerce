import { Request, Response } from 'express';
import { getUserById } from '../auth/service';
import { getProductById } from '../product/service';
import Cart from './model';

export const createCart = async (request: Request, response: Response ) => {
    const { userId, items } = request.body;
    if (!userId) {
        return response.status(400).json({
            success: false,
            message: "User ID is required"
        });
    }

    const userData = getUserById(userId);
    if(!userData) {
        return response.status(400).json({
            success: false,
            message: "User not found"
        });
    }

    if(items.length != 0) {
        for(let item of items) {
            if(!item.product || !item.quantity) {
                return response.status(400).json({
                    success: false,
                    message: "Product and quantity are required for each item"
                });
            }
            const productData = await getProductById(item.product);
            if(!productData) {
                return response.status(400).json({
                    success: false,
                    message: `Product with id ${item.product} not found`
                });
            }
        }
    }

    const createCartResponse =await Cart.create( {user:userId, items } )
    return response.status(201).json({
        success: true,
        message: "Cart created successfully.",
        data: createCartResponse
    });
}

export const listCarts = async (request: Request, response: Response ) => {
    try{
        const listCartsResponse = await Cart.find();
        return response.status(200).json({
            success: true,
            message: "Carts retrieved successfully.",
            data: listCartsResponse
        });
    }catch(error){
        return response.status(500).json({
            success: false,
            message: "Something went wrong in " + error
        });
    }
}

export const updateCart = async (request: Request, response: Response ) => {
    try {
        const { id } = request.params;
        const { user, items } = request.body;
        if (!id) {
            return response.status(400).json({
                success: false,
                message: "Cart id is required"
            });
        }
        if(!user && !items ) {
            return response.status(400).json({
                success: false,
                message: "User or items are required to update"
            });
        }

        const updatedCart = await Cart.findByIdAndUpdate(
            id,
            {
                ...(user && { user }),
                ...(items && { items }),
            },
            {
                returnDocument: "after",
                runValidators: true,
            }
        );

        if (!updatedCart) {
            return response.status(404).json({
                success: false,
                message: "Cart not found"
            });
        }

        return response.status(200).json({
            success: true,
            message: "Cart updated successfully",
            data: updatedCart,
        });
    } catch (error) {
        return response.status(500).json({
            success: false,
            message: "Something went wrong in " + error
        });
    }

}