import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/ServerComponents/NavBar";
import { ThemeProvider } from "@/components/ClientComponents/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import BreadCrumbGenerator from "@/components/ClientComponents/breadcrumb-generator";
import BreadcrumbContextProvider from "@/components/ClientComponents/breadcrumb-generator/breadcrumb-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "dat ui",
    description: "A ui for running dat with a web interface",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                    <Toaster />
                    <BreadcrumbContextProvider>
                        <div className="flex overflow-y-hidden">
                            <div className="w-52">
                                <NavBar />
                            </div>
                            <div className="flex-1 h-screen flex flex-col ">
                                <div className="w-full h-14 flex items-center  border-b">
                                    <div className="pl-4 pr-4">
                                        <BreadCrumbGenerator />
                                    </div>
                                </div>
                                <div className="flex-1 overflow-auto p-6">{children}</div>
                            </div>
                        </div>
                    </BreadcrumbContextProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
