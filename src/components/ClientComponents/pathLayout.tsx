"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import BreadcrumbContextProvider from "./breadcrumb-generator/breadcrumb-context";
import BreadCrumbGenerator from "./breadcrumb-generator";
import NavBar from "@/components/ServerComponents/NavBar";

const PathPage: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const pathname = usePathname();
    return (
        <>
            {pathname === "/sign-up" ? (
                <div className="flex overflow-y-hidden">
                    <div className="flex-1 overflow-auto">{children}</div>
                </div>
            ) : (
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
                            <div className="flex-1 overflow-auto">{children}</div>
                        </div>
                    </div>
                </BreadcrumbContextProvider>
            )}
        </>
    );
};

export default PathPage;
