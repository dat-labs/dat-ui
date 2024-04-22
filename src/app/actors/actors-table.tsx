"use client";
import {memo, useEffect, useMemo , useState, useCallback} from "react";
import { ColumnDef } from "@tanstack/react-table";
import DataTable from "@/components/ClientComponents/data-table";
import { getActorsData } from "./api";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { capitalizeFirstLetter } from "@/lib/utils";


export type Actor = {
    id: string;
    name: string;
    icon: string;
    actor_type: string;
    status: string;
};

export type ActorInstanceData = {
    id: string;
    actor_id: string;
    actor_type: string;
    user_id: string;
    workspace_id: string;
    name: string;
    status: string;
    configuration: object;
    actor: Actor;
};


const getColumns = (actorType : string) : ColumnDef<ActorInstanceData>[] => {
    return [
        {
            accessorKey: "name",
            header: "Name",
        },
        {
            accessorKey: "actor.name",
            header: capitalizeFirstLetter(actorType),
        },
        {
            accessorKey: "user_id",
            header: "User ID",
        },
        {
            accessorKey: "status",
            header: "Status",
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => {
                return (
                    <>
                        <Link className={buttonVariants({ variant: "ghost" })} href={`/actors/${actorType}/run`}>
                            Run
                        </Link>
                        <Link className={buttonVariants({ variant: "ghost" })} href={`/actors/${actorType}/edit`}>
                            Edit
                        </Link>
                        <Link className={buttonVariants({ variant: "ghost" })} href={`/actors/${actorType}/delete`}>
                            Delete
                        </Link>
                    </>
                );
            },
        },
    ];
}

async function ActorsTable({ actorType }: { actorType: string }) {
    const [loadData, setLoadData] = useState([]);
    // const data: ActorInstanceData[] = await getActorsData(actorType);

    const load = useCallback(async () => {
        console.log("load");
        const data: ActorInstanceData[] = await getActorsData(actorType);
        setLoadData(data);
    }, [actorType, setLoadData])


    useEffect(() => {
        console.log("useEffect");
        load()
    }
    ,[])

    // console.log(loadData);
    const columns = useMemo(() => getColumns(actorType), []);
    return <DataTable columns={columns} data={loadData} />;
}

export default memo(ActorsTable);