import type { Metadata } from "next";
import "./globals.css";
import ReduxProvider from "../providers/ReduxProvider";
import Navbar from "../components/Navbar";

export const metadata: Metadata = {
    title: "Ecommerce",
    description: "Make Online Shopping App",
};

export default function RootLayout({
    children
    }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <ReduxProvider>
                    <Navbar /> 
                    <div className="pt-16">
                        {children}
                    </div>
                </ReduxProvider>
            </body>
        </html>
    );
}

