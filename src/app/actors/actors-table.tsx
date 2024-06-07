"use client";

import { memo, useEffect, useMemo, useState, useCallback } from "react";
import { ColumnDef } from "@tanstack/react-table";
import DataTable from "@/components/ClientComponents/data-table";
import { getActorsData } from "./api";
import { capitalizeFirstLetter, getIconComponent } from "@/lib/utils.ts";

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
    connected_connections: object[];
    number_of_connections: number;
};

export type ConnectorSpecification = {
    name: string;
    module_name: string;
    protocol_version: number;
    documentation_url: string;
    changelog_url: string;
    connection_specification: object;
};

function hslToHex(hslString: any) {
    // Remove 'hsl(' and ')' from the string
    hslString = hslString.replace(/hsl\(|\)/g, "").split(" ");
    // Extract Hue, Saturation, and Lightness values
    let hue = parseInt(hslString[0]);
    let saturation = parseInt(hslString[1].slice(0, -1)) / 100;
    let lightness = parseInt(hslString[2].slice(0, -1)) / 100;
    // Convert HSL to RGB
    let c = (1 - Math.abs(2 * lightness - 1)) * saturation;
    let x = c * (1 - Math.abs(((hue / 60) % 2) - 1));
    let m = lightness - c / 2;
    let r, g, b;
    if (hue >= 0 && hue < 60) {
        r = c;
        g = x;
        b = 0;
    } else if (hue >= 60 && hue < 120) {
        r = x;
        g = c;
        b = 0;
    } else if (hue >= 120 && hue < 180) {
        r = 0;
        g = c;
        b = x;
    } else if (hue >= 180 && hue < 240) {
        r = 0;
        g = x;
        b = c;
    } else if (hue >= 240 && hue < 300) {
        r = x;
        g = 0;
        b = c;
    } else {
        r = c;
        g = 0;
        b = x;
    }
    // Convert RGB to hexadecimal
    r = Math.round((r + m) * 255)
        .toString(16)
        .padStart(2, "0");
    g = Math.round((g + m) * 255)
        .toString(16)
        .padStart(2, "0");
    b = Math.round((b + m) * 255)
        .toString(16)
        .padStart(2, "0");
    return `${r}${g}${b}`;
}

// const {theme} = useTheme();

// console.log( style.getPropertyValue('--foreground'))

async function ActorsTable({ actorType }: { actorType: string }) {
    const [loadData, setLoadData] = useState([]);
    // const data: ActorInstanceData[] = await getActorsData(actorType);

    const getColumns = (actorType: string): ColumnDef<ActorInstanceData>[] => {
        // var style = getComputedStyle(document.body);
        return [
            {
                accessorKey: "actor.name",
                header: capitalizeFirstLetter(actorType),
                cell: ({ row }) => {
                    return (
                        <div className="flex items-center">
                            {getIconComponent(row.original.actor.icon).then((IconComponent) =>
                                IconComponent ? (
                                    <IconComponent className="h-7 w-7 fill-foreground" />
                                ) : (
                                    <img
                                        src={`https://ui-avatars.com/api/?name=${row.original.actor.name}`}
                                        alt="icon"
                                        className="h-7 w-7 rounded-md"
                                    />
                                )
                            )}
                            <span className="ml-2">{capitalizeFirstLetter(row.original.actor.name)}</span>
                        </div>
                    );
                },
            },
            {
                accessorKey: "name",
                header: "Name",
            },
            {
                accessorKey: "number_of_connections",
                header: "No of Connections",
            },
        ];
    };

    const load = useCallback(async () => {
        const data = await getActorsData(actorType);
        setLoadData(data);
    }, [actorType, setLoadData]);

    useEffect(() => {
        load();
    }, []);

    // console.log(loadData);
    const columns = useMemo(() => getColumns(actorType), []);

    const handleRowClick = (row: any) => {
        // const currentUrl = router.asPath;
        const currentUrl = window.location.href;

        const newUrl = `${currentUrl}/${row?.original?.id}`;
        console.log(newUrl);
        window.location.href = newUrl;
        // router.push(newUrl);
    };

    return <DataTable columns={columns} data={loadData} clickHandler={handleRowClick} />;
}

export default memo(ActorsTable);
