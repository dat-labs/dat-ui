import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/ServerComponents/NavBar";
import clsx from "clsx";

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
            <body className={clsx(inter.className, "dark")}>
                <div className="flex">
                    <div className="w-24">
                        <NavBar />
                    </div>
                    <div className="flex-1 p-6">{children}</div>
                </div>
            </body>
        </html>
    );
}
