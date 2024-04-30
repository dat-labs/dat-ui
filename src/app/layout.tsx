import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/ServerComponents/NavBar";
import clsx from "clsx";
import { ThemeProvider } from "@/components/ClientComponents/theme-provider";

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
                <ThemeProvider 
                attribute="class"
                defaultTheme="system"
                enableSystem disableTransitionOnChange
                >
                    <div className="flex">
                        <div className="w-52">
                            <NavBar />
                        </div>
                        <div className="flex-1 p-6">{children}</div>
                    </div>
                </ThemeProvider>
            </body>
        </html>
    );
}
