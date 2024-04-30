"use client"
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import clsx from "clsx";
import { ModeToggle } from "../ClientComponents/theme-toggle";


const navItems = [
    {
        icon: "connection-icon.svg",
        label: "Connections",
        url: "/connections",
    },
    {
        icon: "source-icon.svg",
        label: "Source",
        url: "/actors/source",
    },
    {
        icon: "generator-icon.svg",
        label: "Generator",
        url: "/actors/generator",
    },
    {
        icon: "destination-icon.svg",
        label: "Destination",
        url: "/actors/destination",
    },
];

const Sidebar = () => {
    return (
        <div className="flex flex-col w-full h-screen p-4 bg-primary-foreground border-r">
            <div className="flex flex-col">
                <h1 className="text-xl font-semibold">dat</h1>
            </div>
            <div className="flex flex-col py-2 border-y">
                <h1 className="text-sm text-ellipsis">dat (default Workspace)</h1>
            </div>
            <div className="flex-grow pt-8">
                <nav className="flex flex-col space-y-4">
                    {navItems.map((item) => {
                        console.log("item", item)
                        return (
                            <Link
                                key={item.label}
                                className={clsx(
                                    "!px-0 font-normal !justify-start !w-full !text-left hover:bg-primary/10",
                                    buttonVariants({ variant: "ghost" })
                                )}
                                href={item.url}
                            >
                                <Image src={`/images/${item.icon}`} width={24} height={24} alt={item.label}/>
                                <p className="ml-2">{item.label}</p>
                            </Link>
                        )
                    })}
                </nav>
            </div>
            <div className="pt-8">
                <nav className="flex flex-col space-y-4">
                    <p className="text-sm">Help</p>
                    <ModeToggle />
                    <p className="text-sm">Settings</p>
                    <p className="text-sm">Log out</p>
                </nav>
            </div>
        </div>
    );
};

export default Sidebar;
