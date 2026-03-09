import { Request, Response } from 'express';
import { getUserById } from '../auth/service';
import { getProductById } from '../product/service';
import Cart from './model';

export const createCart = async (request: Request, response: Response ) => {
    const { user, items } = request.body;
    if (!user) {
        response.status(400).send("User are required");
        return;
    }

    const userData = getUserById(user);
    if(!userData) {
        response.status(400).send("User not found");
        return;
    }

    if(items.length != 0) {
        for(let item of items) {
            if(!item.product || !item.quantity) {
                return response.status(400).send("Product and quantity are required for each item");
            }
            const productData = await getProductById(item.product);
            if(!productData) {
                return response.status(400).send(`Product with id ${item.product} not found`);
            }
        }
    }

    const createCartResponse = {user, items };
    response.status(201).json(createCartResponse);
}

export const listCarts = async (request: Request, response: Response ) => {
    try{
        const listCartsResponse = await Cart.find();
        response.status(200).json(listCartsResponse);
    }catch(error){
        console.error("Error getting carts:", error);
        response.status(500).json({message: "Internal server error"});
    }
}

export const updateCart = async (request: Request, response: Response ) => {
    const { id } = request.params;
    const { user, items } = request.body;
    if (!id) {
        response.status(400).send("Cart id is required");
        return;
    }
    if(!user && !items ) {
        response.status(400).send("User or items are required to update");
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
        message: "Cart not found",
      });
    }

    return response.status(200).json({
      message: "Cart updated successfully",
      data: updatedCart,
    });

  }

}