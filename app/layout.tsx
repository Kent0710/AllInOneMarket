import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

import NextTopLoader from 'nextjs-toploader'

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "AllInOneMarket",
    description:
        "AllInOneMarket is a unified e-commerce platform that brings together multiple shops, offering a seamless and convenient shopping experience for customers while empowering sellers with real-time order management and efficient store control.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"></meta>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <NextTopLoader color="yellow" />
                {children}
                <Toaster />
            </body>
        </html>
    );
}
