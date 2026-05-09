'use client'
import React, { useState, useEffect } from "react";
import { useSearchParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '../store/store';
import { fetchProductById } from '../store/slices/productsSlice';
import { addToCart } from '../store/slices/cartSlice';
import { useRouter } from 'next/navigation';

interface Product {
    _id: string;
    name: string;
    description: string;
    brand: { name: string };
    category: { name: string };
    price: number;
    stock: number;
    thumbnail: string;
    images: string[];
    specifications: { key: string; value: string }[];
    ratings: { average: number; count: number };
}

const ProductDetails: React.FC = () => {
    const searchParams = useSearchParams();
    const productId = searchParams.get('id');
    const dispatch = useAppDispatch();
    const router = useRouter();
    const isLoggedIn = useAppSelector((state) => !!state.login.user);
    const { currentProduct, loading, error } = useAppSelector((state) => state.products);

    const [selectedImage, setSelectedImage] = useState<string>('');
    const [selectedSize, setSelectedSize] = useState<string>("M");
    const [quantity, setQuantity] = useState<number>(1);

    useEffect(() => {
        if (isLoggedIn) {
            try {
                const stored = localStorage.getItem('pendingCartItem');
                if (stored) {
                    const parsed = JSON.parse(stored);
                    dispatch(addToCart(parsed));
                    dispatch(addItemToUserCart(parsed));
                    localStorage.removeItem('pendingCartItem');
                }
            } catch (e) {
                // ignore JSON/localStorage errors
            }
        }
    }, [isLoggedIn, dispatch]);

    useEffect(() => {
        if (productId) {
            dispatch(fetchProductById(productId));
        }
    }, [productId, dispatch]);


    const handleAddToCart = () => {
        if (!currentProduct) return;

        const cartItem = {
            product: currentProduct,
            quantity: quantity,
            totalPrice: currentProduct.price * quantity,
        };

        if (!isLoggedIn) {
            localStorage.setItem('pendingCartItem', JSON.stringify(cartItem));
            router.push('/login');
            return;
        }

        dispatch(addToCart(cartItem));
        dispatch(addItemToUserCart(cartItem));
    };

    if (loading) {
        return <div className="max-w-7xl mx-auto mt-20 p-6 flex justify-center">Loading product...</div>;
    }

    if (error || !currentProduct) {
        return <div className="max-w-7xl mx-auto mt-20 p-6 flex justify-center text-red-500">Error: {error || 'Product not found'}</div>;
    }

    const allImages = [currentProduct.thumbnail, ...currentProduct.images].filter(Boolean);

    return (
        <div className="max-w-7xl mx-auto mt-20 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

                {/* LEFT - Image Section */}
                <div className="flex gap-4">
                    {/* Thumbnails */}
                    <div className="flex flex-col gap-3">
                        {allImages.map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt="thumb"
                                onClick={() => setSelectedImage(img)}
                                className={`w-20 h-24 object-cover rounded cursor-pointer border ${
                                selectedImage === img
                                    ? "border-red-500"
                                    : "border-gray-300"
                                }`}
                            />
                        ))}
                    </div>

                    {/* Main Image */}
                    <div className="flex-1">
                        <img
                        src={selectedImage}
                        alt="product"
                        className="w-full h-125 object-cover rounded-lg shadow"
                        />
                    </div>
                </div>

                {/* RIGHT - Product Details */}
                <div>
                    <h1 className="text-2xl font-semibold text-gray-800">
                        {currentProduct.name}
                    </h1>

                    {/* Brand + Rating */}
                    <div className="flex items-center gap-4 mt-3">
                        <p className="text-gray-600 text-sm">
                        Brand: <span className="font-medium">{currentProduct.brand?.name || 'Unknown'}</span>
                        </p>
                        <div className="flex items-center text-yellow-400 text-sm">
                        {'★'.repeat(Math.floor(currentProduct.ratings.average))}{'☆'.repeat(5 - Math.floor(currentProduct.ratings.average))}
                        <span className="text-gray-500 ml-2">({currentProduct.ratings.count} Reviews)</span>
                        </div>
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-4 mt-4">
                        <span className="text-2xl font-bold text-red-500">${currentProduct.price}</span>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 mt-4 text-sm leading-relaxed">
                        {currentProduct.description}
                    </p>

                    {/* Specifications */}
                    {currentProduct.specifications && currentProduct.specifications.length > 0 && (
                        <div className="mt-6">
                            <p className="font-medium text-gray-700 mb-2">Specifications:</p>
                            <ul className="text-sm text-gray-600">
                                {currentProduct.specifications.map((spec, index) => (
                                    <li key={index}>{spec.key}: {spec.value}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Size Selection */}
                    <div className="mt-6">
                        <p className="font-medium text-gray-700 mb-2">SIZE:</p>
                        <div className="flex gap-3">
                            {["S", "M", "L", "XL"].map((size) => (
                                <button
                                key={size}
                                onClick={() => setSelectedSize(size)}
                                className={`px-4 py-2 border rounded-md ${
                                    selectedSize === size
                                    ? "bg-red-500 text-white border-red-500"
                                    : "border-gray-300 text-gray-700"
                                }`}
                                >
                                {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Stock */}
                    <p className="mt-4 text-sm text-gray-600">
                        Stock: {currentProduct.stock} | Free Shipping (Est. Delivery Time 2-3 Days)
                    </p>

                    {/* Quantity + Button */}
                    <div className="flex items-center gap-4 mt-6">
                        <input
                            type="number"
                            min={1}
                            max={currentProduct.stock}
                            value={quantity}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                            className="w-20 border border-gray-300 rounded px-3 py-2"
                        />

                        <button
                            onClick={handleAddToCart}
                            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-md font-medium transition"
                        >
                            🛒 ADD TO CART
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;