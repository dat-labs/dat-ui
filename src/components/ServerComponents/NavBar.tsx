"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import clsx from "clsx";
import { ModeToggle } from "@/components/ClientComponents/theme-toggle";
import { LogoBlack, ConnectionIcon, DestinationIcon, GeneratorIcon, SourceIcon } from "@/assets";
import { usePathname } from "next/navigation";
import LogoutButton from "@/components/ClientComponents/Logout-button";
import { getSession } from "next-auth/react";
import CircularLoader from "../ui/circularLoader";
import { CaretSortIcon, PlusCircledIcon, PlusIcon } from "@radix-ui/react-icons";
import Loading from "@/app/actors/loading";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ScrollArea } from "@radix-ui/react-scroll-area";
import AddWorkspaceForm from "../ClientComponents/addWorkspace/addWorkspaceForm";
import useApiCall from "@/hooks/useApiCall";
import { getWorkspaces } from "../ClientComponents/addWorkspace/api";

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
        url: "https://datlabs.gitbook.io/datlabs",
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

    const [refresh, setRefresh] = useState(false);

    const toggleRefresh = () => {
        setRefresh(!refresh);
    };

    useEffect(() => {
        const fetchSession = async () => {
            const session = await getSession();
            setSession(session);
        };
        fetchSession();
    }, []);

    const { data, loading, makeApiCall } = useApiCall(getWorkspaces);
    const [workspaces, setWorkspaces] = useState([]);

    useEffect(() => {
        if (session) {
            (async () => {
                setCurWkspc(session.user.workspace_name);
                await makeApiCall(session.user.organization_id);
            })();
        }
    }, [session, refresh]);

    useEffect(() => {
        if (data) {
            setWorkspaces(data.responseData);
        }
    }, [data]);

    const [curWkspc, setCurWkspc] = React.useState("Default");

    return (
        <div className="flex flex-col w-full h-screen py-4 bg-primary-foreground border-r">
            <div className="flex flex-col px-4">
                <Link href="/connections">
                    {/* <Image src={LogoWhite} width={100} height={100} alt="logo"/> */}
                    <LogoBlack className="h-6 w-24 fill-foreground mb-[15px]" />
                </Link>
            </div>
            <div className="border-y">
                {session && !loading ? (
                    <div className="flex">
                        <DropdownMenu>
                            <div className="flex items-center justify-between w-full p-0">
                                <DropdownMenuTrigger asChild className="cursor-pointer w-full p-2 px-6 hover:bg-primary/10">
                                    <p className="flex flex-row items-center justify-between w-full">
                                        {curWkspc} <CaretSortIcon className="size-6" />
                                    </p>
                                </DropdownMenuTrigger>
                                <AddWorkspaceForm postSubmissionAction={toggleRefresh} />
                            </div>

                            <DropdownMenuContent className="w-40">
                                <DropdownMenuLabel className="ml-8 p-0">Workspaces</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <ScrollArea className="h-24 overflow-auto">
                                    {workspaces.map((wkspc, ind) => (
                                        <DropdownMenuCheckboxItem
                                            key={ind}
                                            checked={curWkspc == wkspc.name}
                                            onCheckedChange={() => setCurWkspc(wkspc.name)}
                                        >
                                            {wkspc.name}
                                        </DropdownMenuCheckboxItem>
                                    ))}
                                </ScrollArea>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                ) : (
                    <Loading height="50px" />
                )}
            </div>

            {/* 
            <div className="py-2 px-5 border-y">
                {session ? (
                    <div className="flex items-center gap-3">
                        <p>{`${session?.user?.workspace_name} `}</p> <CaretSortIcon width={20} height={20} />
                    </div>
                ) : (
                    <Loading height="50px" />
                )}
            </div> 
            */}

            <div className="flex-grow pt-8 px-4">
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
            <div className="pt-8 px-4">
                <nav className="flex flex-col space-y-4">
                    {bottomNavItems.map((item) =>
                        item.component ? (
                            <Link href={item.url ? item.url : ""} key={item.label}>
                                <item.component>{item.label && <p className="text-sm">{item.label}</p>}</item.component>
                            </Link>
                        ) : (
                            <Link href={item.url ? item.url : ""} key={item.label} target="_blank" rel="noopener noreferrer">
                                {item.label && <p className="text-sm">{item.label}</p>}
                            </Link>
                        )
                    )}
                </nav>
            </div>
        </div>
    );
};

export default Sidebar;
