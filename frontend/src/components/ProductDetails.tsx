'use client'
import React, { useState } from "react";

const images = [
    "/images/hudi.png",
    "/images/hudi.png",
    "/images/hudi.png",
    "/images/hudi.png"
];

const ProductDetails: React.FC = () => {
    const [selectedImage, setSelectedImage] = useState(images[1]);
    const [selectedSize, setSelectedSize] = useState<string>("M");
    const [quantity, setQuantity] = useState<number>(1);

    return (
        <div className="max-w-7xl mx-auto mt-20 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                
                {/* LEFT - Image Section */}
                <div className="flex gap-4">
                    {/* Thumbnails */}
                    <div className="flex flex-col gap-3">
                        {images.map((img, index) => (
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
                        VNEED Women Embroidered Rayon Kurta Pant Set |
                        Kurta set for Women | Ethnic Kurta Set for Women (5XL)
                    </h1>

                    {/* Brand + Rating */}
                    <div className="flex items-center gap-4 mt-3">
                        <p className="text-gray-600 text-sm">
                        Brand: <span className="font-medium">VNEED</span>
                        </p>
                        <div className="flex items-center text-yellow-400 text-sm">
                        ★★★★☆
                        <span className="text-gray-500 ml-2">(3 Reviews)</span>
                        </div>
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-4 mt-4">
                        <span className="text-2xl font-bold text-red-500">2200tk</span>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 mt-4 text-sm leading-relaxed">
                        Lorem Ipsum is simply dummy text of the printing and typesetting
                        industry. Lorem Ipsum has been the industry's standard dummy text
                        ever since the 1500s.
                    </p>

                    {/* Size Selection */}
                    <div className="mt-6">
                        <p className="font-medium text-gray-700 mb-2">SIZE:</p>
                        <div className="flex gap-3">
                            {["S", "L", "M"].map((size) => (
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

                    {/* Shipping */}
                    <p className="mt-4 text-sm text-gray-600">
                        Free Shipping (Est. Delivery Time 2-3 Days)
                    </p>

                    {/* Quantity + Button */}
                    <div className="flex items-center gap-4 mt-6">
                        <input
                            type="number"
                            min={1}
                            value={quantity}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                            className="w-20 border border-gray-300 rounded px-3 py-2"
                        />

                        <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-md font-medium transition">
                            🛒 ADD TO CART
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;