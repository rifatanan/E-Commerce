import type { Metadata } from "next";
import "./globals.css";

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
                <div className="pt-16">
                    {children}
                </div>
            </body>
        </html>
    );
}

