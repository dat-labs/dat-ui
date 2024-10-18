"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import BreadcrumbContextProvider from "./breadcrumb-generator/breadcrumb-context";
import BreadCrumbGenerator from "./breadcrumb-generator";
import NavBar from "@/components/ServerComponents/NavBar";
import { ThemeToggleButton } from "./themeToggleButton";
import { WorkspaceContextProvider } from "./workspace-provider";

const PathPage: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { data: session } = useSession(); 
    const pathname = usePathname();
    const [showNavBar, setShowNavBar] = useState(false); 
    useEffect(() => {
        if (session) {
            const timer = setTimeout(() => {
                setShowNavBar(true); 
            }, 500); 
            return () => clearTimeout(timer); 
        } else {
            setShowNavBar(false);
        }
    }, [session]);

    return (
        <>
            {pathname === "/sign-up" ? (
                <div className="flex overflow-y-hidden">
                    <div className="flex-1 overflow-auto">{children}</div>
                </div>
            ) : (
                <BreadcrumbContextProvider>
                    <WorkspaceContextProvider>
                        <div className="flex overflow-y-hidden">
                            {showNavBar && session ? (
                                <div className="w-52">
                                    <NavBar />
                                </div>
                            ) : null}
                            <div className="flex-1 h-screen flex flex-col ">
                                <div className="w-full h-14 flex items-center justify-between border-b">
                                    <div className="pl-4 pr-4">
                                        <BreadCrumbGenerator />
                                    </div>
                                    <div className="mr-8">
                                        <ThemeToggleButton />
                                    </div>
                                </div>

                                <div className="flex-1 overflow-auto">{children}</div>
                            </div>
                        </div>
                    </WorkspaceContextProvider>
                </BreadcrumbContextProvider>
            )}
        </>
    );
};

export default PathPage;
