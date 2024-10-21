"use client";

import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import clsx from "clsx";
import { LogoBlack, ConnectionIcon, DestinationIcon, GeneratorIcon, SourceIcon } from "@/assets";
import { usePathname, useRouter } from "next/navigation";
import LogoutButton from "@/components/ClientComponents/Logout-button";
import { getSession } from "next-auth/react";
import { CaretSortIcon, LoopIcon, PersonIcon } from "@radix-ui/react-icons";
import Loading from "@/app/actors/loading";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import AddWorkspaceForm from "../ClientComponents/addWorkspace/addWorkspaceForm";
import useApiCall from "@/hooks/useApiCall";
import { getWorkspaces } from "../ClientComponents/addWorkspace/api";
import { WorkspaceDataContext } from "../ClientComponents/workspace-provider";
import { Card } from "../ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import useSearch from "@/hooks/useSearch";
import { Search } from "../commom/search-bar";

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
        url: "https://docs.dat-hub.com/",
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
    const { curWorkspace, updateCurrentWorkspace } = useContext(WorkspaceDataContext);

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
    const router = useRouter();

    useEffect(() => {
        if (session) {
            (async () => {
                updateCurrentWorkspace(session.user.workspace_id, session.user.workspace_name);
                await makeApiCall(session.user.organization_id);
            })();
        }
    }, [session, refresh]);

    useEffect(() => {
        if (data) {
            setWorkspaces(data.responseData);
        }
    }, [data]);

    const changeWorkspace = (wkspc: any) => {
        router.push("/connections");
        updateCurrentWorkspace(wkspc.id, wkspc.name);
    };

    const [open, setOpen] = React.useState(false);

    const { query, setQuery, filteredData } = useSearch(workspaces, "name", false);

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
                    <div className="flex w-full">
                        <div className="flex items-center space-x-4 w-full hover:bg-primary/5">
                            <Popover open={open} onOpenChange={setOpen}>
                                <PopoverTrigger asChild>
                                    <div className="flex justify-between items-center w-full p-2 px-6">
                                        <div className="flex items-center gap-2">
                                            <Card className="rounded-sm">
                                                <img
                                                    src={`https://ui-avatars.com/api/?name=${curWorkspace.name}`}
                                                    alt="icon"
                                                    className="h-7 w-7"
                                                />
                                            </Card>
                                            <p>
                                                {curWorkspace?.name
                                                    ? curWorkspace.name.length > 8
                                                        ? `${curWorkspace.name.slice(0, 8)}...`
                                                        : curWorkspace.name
                                                    : "Loading..."}
                                            </p>
                                        </div>

                                        <CaretSortIcon className="size-6" />
                                    </div>
                                </PopoverTrigger>
                                <PopoverContent className="p-0 min-w-[600px]" side="right" align="start">
                                    <div className="flex flex-col p-2 gap-2">
                                        <Search
                                            type="search"
                                            placeholder={`Search for any Workspace`}
                                            className="rounded-sm"
                                            handleSearch={(e) => setQuery(e.target.value)}
                                            search={query}
                                        />
                                        <ScrollArea className="max-h-[300px] overflow-auto px-2">
                                            <Card
                                                key={curWorkspace.name}
                                                onClick={() => changeWorkspace(curWorkspace)}
                                                className="flex items-center pl-4 py-2 rounded-sm h-fit cursor-pointer mb-3 mx-auto hover:bg-muted"
                                            >
                                                <div className="flex flex-row w-full items-start justify-between">
                                                    <div className="flex flex-col gap-2">
                                                        <div className="flex items-center gap-2">
                                                            <Card className="rounded-sm">
                                                                <img
                                                                    src={`https://ui-avatars.com/api/?name=${curWorkspace.name}`}
                                                                    alt="icon"
                                                                    className="h-8 w-8"
                                                                />
                                                            </Card>
                                                            <p>{curWorkspace.name}</p>
                                                        </div>
                                                        <Button
                                                            asChild
                                                            size="sm"
                                                            variant="outline"
                                                            onClick={(e) => e.stopPropagation()}
                                                        >
                                                            <Link href="/settings?tab=members">
                                                                <PersonIcon className="size-4 mr-1" />
                                                                <span>Manage Members</span>
                                                            </Link>
                                                        </Button>
                                                    </div>
                                                    <div className="flex p-2 pr-4 text-sm font-medium">Current Workspace</div>
                                                </div>
                                            </Card>

                                            {filteredData.map(
                                                (wkspc) =>
                                                    wkspc.name !== curWorkspace.name && (
                                                        <Card
                                                            key={wkspc.name}
                                                            onClick={() => changeWorkspace(wkspc)}
                                                            className="flex items-center pl-4 rounded-sm shadow-xs h-12 cursor-pointer mb-1 mx-auto hover:bg-muted"
                                                        >
                                                            <div className="w-full flex gap-3 items-center">
                                                                <Card className="rounded-sm">
                                                                    <img
                                                                        src={`https://ui-avatars.com/api/?name=${wkspc.name}`}
                                                                        alt="icon"
                                                                        className="h-8 w-8"
                                                                    />
                                                                </Card>
                                                                <div className="w-full flex flex-row justify-between items-center">
                                                                    <p>{wkspc.name}</p>
                                                                    <LoopIcon className="size-4 mr-2" />
                                                                </div>
                                                            </div>
                                                        </Card>
                                                    )
                                            )}
                                        </ScrollArea>
                                        <AddWorkspaceForm postSubmissionAction={toggleRefresh} />
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                ) : (
                    <Loading height="50px" />
                )}
            </div>
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
                    {bottomNavItems.map((item, index) =>
                        item.component ? (
                            <Link href={item.url ? item.url : ""} key={item.label || index}>
                                <item.component>{item.label && <p className="text-sm">{item.label}</p>}</item.component>
                            </Link>
                        ) : (
                            <Link
                                href={item.url ? item.url : ""}
                                key={item.label || index}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
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
