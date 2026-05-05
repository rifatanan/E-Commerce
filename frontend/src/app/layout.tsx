import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/Navbar";
import { ReactNode } from "react";
import Providers from "../providers/Providers";
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
    title: "Home Page",
    description: "Welcome to our e-commerce store! Explore a wide range of products, enjoy seamless shopping, and experience top-notch customer service. Your one-stop destination for all your shopping needs.",
};

export default function RootLayout( { children}: { children: ReactNode} ) {
    return (
        <html lang="en">
            <body>
                <Providers>
                    <Navbar /> 
                    <div className="pt-16">
                        {children}
                    </div>
                    <Toaster />
                </Providers>
            </body>
        </html>
    );
}

