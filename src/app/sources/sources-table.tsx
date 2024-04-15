"use client";

import { ColumnDef } from "@tanstack/react-table";
import DataTable from "@/components/ClientComponents/data-table";
import { getSourcesData } from "./api";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export type ActorData = {
    id: string;
    name: string;
    icon: string;
    actor_type: string;
    status: string;
};

export type SourcesData = {
    id: string;
    name: string;
    user_id: string;
    actor: ActorData;
    created_at: String;
};

export const columns: ColumnDef<SourcesData>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "actor.name",
        header: "Source",
    },
    {
        accessorKey: "user_id",
        header: "User ID",
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            return (
                <>
                    <Link className={buttonVariants({ variant: "ghost" })} href="/sources/add">
                        Run
                    </Link>
                    <Link className={buttonVariants({ variant: "ghost" })} href="/sources/add">
                        Edit
                    </Link>
                    <Link className={buttonVariants({ variant: "ghost" })} href="/sources/add">
                        Delete
                    </Link>
                </>
            );
        },
    },
];

export default async function SourcesTable() {
    const data: SourcesData[] = await getSourcesData();
    return <DataTable columns={columns} data={data} />;
}
