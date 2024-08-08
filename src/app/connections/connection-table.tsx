import { memo, useMemo } from "react";
import DataTable from "@/components/ClientComponents/data-table";
import { useRouter } from "next/navigation";
import { ConnectionActions } from "@/components/ClientComponents/action-button-groups";
import { importIcon } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Card } from "@/components/ui/card";

interface Actor {
    name: string;
    module_name: string;
    icon: string;
    actor_type: string;
    status: string;
}

interface DestinationInstance {
    actor: Actor;
    actor_id: string;
    actor_type: string;
    configuration: any;
    id: string;
    name: string;
    status: string;
    user_id: string;
    workspace_id: string;
}

interface GeneratorInstance {
    actor: Actor;
    actor_id: string;
    actor_type: string;
    configuration: any;
    id: string;
    name: string;
    status: string;
    user_id: string;
    workspace_id: string;
}

interface SourceInstance {
    actor: Actor;
    actor_id: string;
    actor_type: string;
    configuration: any;
    id: string;
    name: string;
    status: string;
    user_id: string;
    workspace_id: string;
}

interface ConnectionInstance {
    catalog: any;
    configuration: any;
    destination_instance: DestinationInstance;
    destination_instance_id: string;
    generator_instance: GeneratorInstance;
    generator_instance_id: string;
    id: string;
    name: string;
    namespace_format: string;
    prefix: string;
    schedule: any;
    schedule_type: string;
    source_instance: SourceInstance;
    source_instance_id: string;
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
                const SourceIconComponent = importIcon(row.original.source_instance.actor.icon);
                const GeneratorIconComponent = importIcon(row.original.generator_instance.actor.icon);
                const DestinationComponent = importIcon(row.original.destination_instance.actor.icon);

                return (
                    <div className="flex items-center">
                        {SourceIconComponent !== null ? (
                            <Card className="p-1  bg-white">
                                <SourceIconComponent className="h-6 w-6" />
                            </Card>
                        ) : (
                            <img
                                src={`https://ui-avatars.com/api/?name=${row.original.source_instance.name}`}
                                alt="icon"
                                className="h-7 w-7 rounded-md"
                            />
                        )}
                        <ArrowRightIcon className="mx-1" />
                        {GeneratorIconComponent !== null ? (
                            <Card className="p-1  bg-white">
                                <GeneratorIconComponent className="h-6 w-6" />
                            </Card>
                        ) : (
                            <img
                                src={`https://ui-avatars.com/api/?name=${row.original.generator_instance.name}`}
                                alt="icon"
                                className="h-7 w-7 rounded-md"
                            />
                        )}
                        <ArrowRightIcon className="mx-1" />
                        {DestinationComponent !== null ? (
                            <Card className="p-1  bg-white">
                                <DestinationComponent className="h-6 w-6" />
                            </Card>
                        ) : (
                            <img
                                src={`https://ui-avatars.com/api/?name=${row.original.destination_instance.name}`}
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
            accessorKey: "source_instance.name",
            header: "Source Name",
        },
        {
            accessorKey: "generator_instance.name",
            header: "Generator Name",
        },
        {
            accessorKey: "destination_instance.name",
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

    return (
        <DataTable
            actorType={"Connection Name"}
            columns={columns}
            data={loadData}
            clickHandler={(row) => {
                router.push(`/connections/${row.original.id}`);
            }}
        />
    );
}

export default memo(ConnectionsTable);
