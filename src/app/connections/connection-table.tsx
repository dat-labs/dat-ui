import { memo, useEffect, useMemo, useState, useCallback } from "react";
import DataTable from "@/components/ClientComponents/data-table";
import { getConnectionsData } from "./api";
import { useRouter } from "next/navigation";
import { ConnectionActions } from "@/components/ClientComponents/action-button-groups";
import { getActorData } from "../actors/api";
import { importIcon } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowRightIcon } from "@radix-ui/react-icons";

interface ActorIcon {
    source_icon: string;
    generator_icon: string;
    destination_icon: string;
}

interface ConnectionInstance {
    actor_icon: ActorIcon;
    catalog: any;
    configuration: Record<string, any>;
    destination_instance_id: string;
    destination_name: string;
    generator_instance_id: string;
    generator_name: string;
    id: string;
    name: string;
    namespace_format: string;
    prefix: string;
    schedule: any;
    schedule_type: string;
    source_instance_id: string;
    source_name: string;
    status: string;
    workspace_id: string;
}

/**
 * Defines the columns for the connection table.
 * @returns {ColumnDef<ConnectionInstance>[]} An array of column definitions.
 */
const getColumns = (): ColumnDef<ConnectionInstance>[] => {
    return [
        {
            accessorKey: "id",
            header: "Connection",
            cell: ({ row }) => {
                const SourceIconComponent = importIcon(row.original.actor_icon.source_icon);
                const GeneratorIconComponent = importIcon(row.original.actor_icon.generator_icon);
                const DestinationComponent = importIcon(row.original.actor_icon.destination_icon);

                return (
                    <div className="flex items-center">
                        {SourceIconComponent !== null ? (
                            <SourceIconComponent className="h-6 w-6 stroke-foreground" />
                        ) : (
                            <img
                                src={`https://ui-avatars.com/api/?name=${row.original.source_name}`}
                                alt="icon"
                                className="h-7 w-7 rounded-md"
                            />
                        )}
                        <ArrowRightIcon className="mx-1" />
                        {GeneratorIconComponent !== null ? (
                            <GeneratorIconComponent className="h-6 w-6 stroke-foreground" />
                        ) : (
                            <img
                                src={`https://ui-avatars.com/api/?name=${row.original.generator_name}`}
                                alt="icon"
                                className="h-7 w-7 rounded-md"
                            />
                        )}
                        <ArrowRightIcon className="mx-1" />
                        {DestinationComponent !== null ? (
                            <DestinationComponent className="h-6 w-6 stroke-foreground" />
                        ) : (
                            <img
                                src={`https://ui-avatars.com/api/?name=${row.original.destination_name}`}
                                alt="icon"
                                className="h-7 w-7 rounded-md"
                            />
                        )}
                    </div>
                );
            },
        },
        {
            accessorKey: "name",
            header: "Connection Name",
        },
        {
            accessorKey: "source_name",
            header: "Source Name",
        },
        {
            accessorKey: "generator_name",
            header: "Generator Name",
        },
        {
            accessorKey: "destination_name",
            header: "Destination Name",
        },
        {
            accessorKey: "schedule_type",
            header: "Schedule",
        },
        {
            accessorKey: "status",
            header: "Status",
        },
        {
            accessorKey: "actions",
            header: "Actions",
            cell: ({ row }) => {
                return (
                    <div className="flex items-center">
                        <ConnectionActions connectionId={row.original.id} />
                    </div>
                );
            },
        },
    ];
};

/**
 * A table component to display connections data.
 * @param {any[]} loadData - The data to be loaded into the table.
 * @returns {JSX.Element} The rendered ConnectionsTable component.
 */
function ConnectionsTable({ loadData = [] }) {
    const router = useRouter();

    const columns = useMemo(() => getColumns(), []);
    const [tableData, setTableData] = useState([]);

    /**
     * Fetches more actor data for each connection and sets the table data.
     * This effect runs on component mount and whenever `loadData` changes.
     */
    useEffect(() => {
        const modifyData = async () => {
            const promises = loadData.map(async (row: any) => {
                const src = await getActorData("source", row.source_instance_id);
                const gen = await getActorData("generator", row.generator_instance_id);
                const des = await getActorData("destination", row.destination_instance_id);

                return {
                    ...row,
                    actor_icon: {
                        source_icon: src.actor.icon,
                        generator_icon: gen.actor.icon,
                        destination_icon: des.actor.icon,
                    },
                    source_name: src.name,
                    generator_name: gen.name,
                    destination_name: des.name,
                };
            });

            const result = await Promise.all(promises);

            setTableData(result);
        };

        modifyData();
    }, []);
    console.log(tableData);

    return (
        <DataTable
            actorType={"Connection Name"}
            columns={columns}
            data={tableData}
            clickHandler={(row) => {
                router.push(`/connections/${row.original.id}`);
            }}
        />
    );
}

export default memo(ConnectionsTable);
