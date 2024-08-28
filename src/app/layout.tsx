import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ClientComponents/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import PathPage from "@/components/ClientComponents/pathLayout";

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
        <html lang="en" suppressHydrationWarning>
            <body>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                    <Toaster />
                    <PathPage>{children}</PathPage>
                </ThemeProvider>
            </body>
        </html>
    );
}
