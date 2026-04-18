import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/Navbar";
import { ReactNode } from "react";
import Providers from "../providers/Providers";
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: "Home Page",
  description: "Welcome to my Next.js app",
};

export default function RootLayout({
    children
    }: {
    children: ReactNode;
}) {
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

