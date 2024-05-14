import React from "react";
import DataTable from "../data-table";
import { Button } from "@/components/ui/button";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { Switch } from "@/components/ui/switch";
import { FromDataContext } from ".";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import FormGenerator from "../FormGenerator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import DocWrapper from "@/app/actors/[actorType]/[actorId]/DocWrapper";

export default function Streams({ data }) {
    const { state, updateState } = React.useContext(FromDataContext);

    const handleStreamConfigrationSave = (values: any, streamName: string) => {
        updateState("streams", {
            ...state.streams,
            [streamName]: { ...state.streams[streamName], configuration: values },
        });
    };
    const columns = [
        {
            header: "Configured",
            cell: ({ row }: { row: any }) => {
                return (
                    <>
                        <Switch
                            id={`configured-${row.getValue("name")}`}
                            checked={row.original.configured}
                            onCheckedChange={(ch: any) =>
                                updateState("streams", {
                                    ...state.streams,
                                    [row.getValue("name")]: { ...state.streams[row.getValue("name")], configured: ch },
                                })
                            }
                        />
                    </>
                );
            },
        },
        {
            accessorKey: "name",
            header: "Stream Name",
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => {
                return (
                    <>
                        <Dialog>
                            <DialogTrigger>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                disabled={!state.streams[row.getValue("name")].configured}
                                            >
                                                <Pencil2Icon className="w-4 h-4" />
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Edit stream configuration.</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </DialogTrigger>
                            <DialogContent className="max-w-lg">
                                <DocWrapper>
                                    <DialogHeader>
                                        <DialogTitle>Configure {row.getValue("name")} stream</DialogTitle>
                                    </DialogHeader>
                                    <FormGenerator
                                        properties={row.original.streamProperties.properties}
                                        defaultData={state.streams[row.getValue("name")].configuration}
                                        onSubmit={(values: any) => handleStreamConfigrationSave(values, row.getValue("name"))}
                                    />
                                </DocWrapper>
                            </DialogContent>
                        </Dialog>
                    </>
                );
            },
        },
    ];
    return (
        <div>
            <DataTable columns={columns} data={data} />
        </div>
    );
}
