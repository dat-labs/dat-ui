"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import clsx from "clsx";
import { ModeToggle } from "@/components/ClientComponents/theme-toggle";
import { LogoBlack, ConnectionIcon, DestinationIcon, GeneratorIcon, SourceIcon } from "@/assets";
import { usePathname } from "next/navigation";
import LogoutButton from "@/components/ClientComponents/Logout-button";
import { getSession } from "next-auth/react";
import CircularLoader from "../ui/circularLoader";
import { CaretSortIcon } from "@radix-ui/react-icons";
import Loading from "@/app/actors/loading";

/**
 * NavItemComponent serves as a wrapper for navigation items.
 * @param children - The children elements to render.
 * @returns The rendered NavItemComponent.
 */
const NavItemComponent = ({ children }) => {
    return <div>{children}</div>;
};

/**
 * Defines the items for the main navigation section.
 */
const navItems = [
    {
        icon: ConnectionIcon,
        label: "Connections",
        url: "/connections",
    },
    {
        icon: SourceIcon,
        label: "Source",
        url: "/actors/source",
    },
    {
        icon: GeneratorIcon,
        label: "Generator",
        url: "/actors/generator",
    },
    {
        icon: DestinationIcon,
        label: "Destination",
        url: "/actors/destination",
    },
];

/**
 * Defines the items for the bottom navigation section.
 */
const bottomNavItems = [
    {
        label: "Help",
        url: "/help",
        component: NavItemComponent,
    },
    {
        component: ModeToggle,
    },
    {
        label: "Settings",
        url: "/settings",
        component: NavItemComponent,
    },
    {
        component: LogoutButton,
    },
];

/**
 * Sidebar component renders the navigation sidebar with links to different sections.
 * @returns The rendered Sidebar component.
 */
const Sidebar = () => {
    const pathname = usePathname();
    const [session, setSession] = useState(null);

    useEffect(() => {
        const fetchSession = async () => {
            const session = await getSession();
            setSession(session);
        };
        fetchSession();
    }, []);

    return (
        <div className="flex flex-col w-full h-screen p-4 bg-primary-foreground border-r">
            <div className="flex flex-col">
                <Link href="/connections">
                    {/* <Image src={LogoWhite} width={100} height={100} alt="logo"/> */}
                    <LogoBlack className="h-10 w-24 fill-foreground mb-4" />
                </Link>
            </div>
            <div className="flex flex-col py-2 border-y">
                {session ? (
                    <div className="flex flex-row items-center justify-between mx-2">
                        <h1 className="text-sm text-ellipsis">{`Dat (${session?.user?.workspace_id})`}</h1>
                        {/* To-Do -> Setup an onClick here -> */}
                        <CaretSortIcon width={20} height={20} />
                    </div>
                ) : (
                    <Loading height="50px" />
                )}
            </div>
            <div className="flex-grow pt-8">
                <nav className="flex flex-col space-y-4">
                    {navItems.map((item) => (
                        <Link
                            key={item.label}
                            className={clsx(
                                "!px-2 font-normal !justify-start !w-full !text-left hover:bg-primary/10",
                                buttonVariants({ variant: pathname.startsWith(item.url) ? "default" : "ghost" })
                            )}
                            href={item.url}
                        >
                            <item.icon
                                className={`h-6 w-6 ${
                                    pathname.startsWith(item.url) ? `stroke-background` : `stroke-foreground`
                                } `}
                            />
                            <p className="ml-2">{item.label}</p>
                        </Link>
                    ))}
                </nav>
            </div>
            <div className="pt-8">
                <nav className="flex flex-col space-y-4">
                    {bottomNavItems.map((item) => (
                        <Link href={item.url ? item.url : ""} key={item.label}>
                            <item.component>{item.label && <p className="text-sm">{item.label}</p>}</item.component>
                        </Link>
                    ))}
                </nav>
            </div>
        </div>
    );
};

export default Sidebar;
