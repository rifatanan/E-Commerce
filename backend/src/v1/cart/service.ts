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

    try {
        const userData = await getUserById(userId);
        if(!userData) {
            return response.status(400).json({
                success: false,
                message: "User not found"
            });
        }

        let cartItems = items || [];
        if(cartItems && cartItems.length > 0) {
            for(let item of cartItems) {
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
                if (item.quantity < 1) {
                    return response.status(400).json({
                        success: false,
                        message: "Quantity must be at least 1"
                    });
                }
                // Calculate total price if not provided
                if (!item.totalPrice && productData.price) {
                    item.totalPrice = productData.price * item.quantity;
                }
            }
        }

        const createCartResponse = await Cart.create( {user:userId, items: cartItems } )
        return response.status(201).json({
            success: true,
            message: "Cart created successfully.",
            data: createCartResponse
        });
    } catch (error) {
        return response.status(500).json({
            success: false,
            message: "Something went wrong: " + error
        });
    }
}

export const listCarts = async (request: Request, response: Response ) => {
    try{
        const listCartsResponse = await Cart.find().populate('user').populate('items.product');
        return response.status(200).json({
            success: true,
            message: "Carts retrieved successfully.",
            data: listCartsResponse
        });
    }catch(error){
        return response.status(500).json({
            success: false,
            message: "Something went wrong: " + error
        });
    }
}

export const getCartByUserId = async (request: Request, response: Response ) => {
    try {
        const { userId } = request.params;
        if (!userId) {
            return response.status(400).json({
                success: false,
                message: "User ID is required"
            });
        }

        const cart = await Cart.findOne({ user: userId }).populate('user').populate('items.product');
        if (!cart) {
            return response.status(404).json({
                success: false,
                message: "Cart not found for this user"
            });
        }

        return response.status(200).json({
            success: true,
            message: "Cart retrieved successfully.",
            data: cart
        });
    } catch (error) {
        return response.status(500).json({
            success: false,
            message: "Something went wrong: " + error
        });
    }
}

export const singleProduct = async (request: Request, response: Response ) => {
    try {
        const { cartId, productId } = request.params;
        if (!cartId || !productId) {
            return response.status(400).json({
                success: false,
                message: "cartId and productId are required"
            });
        }

        const cart = await Cart.findById(cartId).populate('items.product');
        if (!cart) {
            return response.status(404).json({ success: false, message: 'Cart not found' });
        }

        const item = cart.items.find((it: any) => String(it.product._id || it.product) === String(productId));
        if (!item) {
            return response.status(404).json({ success: false, message: 'Product not found in cart' });
        }

        return response.status(200).json({ success: true, message: 'Product retrieved from cart', data: item });
    } catch (error) {
        return response.status(500).json({ success: false, message: 'Something went wrong: ' + error });
    }
}

export const userAllProduct = async (request: Request, response: Response ) => {
    try {
        const { userId } = request.params;
        if (!userId) {
            return response.status(400).json({ success: false, message: 'User ID is required' });
        }

        const carts = await Cart.find({ user: userId }).populate('items.product');
        if (!carts || carts.length === 0) {
            return response.status(404).json({ success: false, message: 'No carts found for this user' });
        }

        // Flatten items from all carts
        const products = carts.reduce((acc: any[], c: any) => {
            if (Array.isArray(c.items)) acc.push(...c.items);
            return acc;
        }, []);

        return response.status(200).json({ success: true, message: 'User products retrieved', data: products });
    } catch (error) {
        return response.status(500).json({ success: false, message: 'Something went wrong: ' + error });
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

        // Validate items if provided
        if (items && Array.isArray(items) && items.length > 0) {
            for (let item of items) {
                if (!item.product || item.quantity === undefined) {
                    return response.status(400).json({
                        success: false,
                        message: "Product and quantity are required for each item"
                    });
                }
                const productData = await getProductById(item.product);
                if (!productData) {
                    return response.status(400).json({
                        success: false,
                        message: `Product with id ${item.product} not found`
                    });
                }
                if (item.quantity < 1) {
                    return response.status(400).json({
                        success: false,
                        message: "Quantity must be at least 1"
                    });
                }
                // Calculate total price if product price is available
                if (productData.price && !item.totalPrice) {
                    item.totalPrice = productData.price * item.quantity;
                }
            }
        }

        const updatedCart = await Cart.findByIdAndUpdate(
            id,
            {
                ...(user && { user }),
                ...(items && { items }),
            },
            {
                new: true,
                runValidators: true,
            }
        ).populate('user').populate('items.product');

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
            message: "Something went wrong: " + error
        });
    }
}