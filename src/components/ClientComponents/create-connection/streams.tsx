import React, { useEffect, useState } from "react";
import DataTable from "../data-table";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, Pencil2Icon } from "@radix-ui/react-icons";
import { Switch } from "@/components/ui/switch";
import { FromDataContext } from ".";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StreamPanel from "./StreamPanel";
import useApiCall from "@/hooks/useApiCall";
import { getActorDocumentation } from "@/app/actors/[actorType]/create/api";
import EditSchemaPanel from "./editSchemaPanel";
import { capitalizeFirstLetter, importIcon } from "@/lib/utils";
import { Card } from "@/components/ui/card";

export default function Streams({ data }: { data: any }) {
    const { state, updateState } = React.useContext(FromDataContext);
    console.log(state);

    const [streamDoc, setStreamDoc] = useState(null);
    const { data: docData, statusCode: docStatus, makeApiCall } = useApiCall(getActorDocumentation);

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [activeRow, setActiveRow] = useState<any>(null);

    useEffect(() => {
        (async () => {
            const actorName = state.source?.value?.actor?.module_name?.replace("_", "-");
            const docPath = `sources/${actorName}/stream-configuration`;
            await makeApiCall(docPath);
        })();
    }, []);

    useEffect(() => {
        if (docData) {
            setStreamDoc(docData.responseData);
        }
    }, [docData, setStreamDoc]);

    const handleStreamConfigrationSave = (values: any, streamName: string) => {
        updateState("streams", {
            ...state.streams,
            [streamName]: { ...state.streams[streamName], configuration: values },
        });
    };

    const handleRowClick = (row: any) => {
        const streamName = row.getValue("name");
        const currentConfiguredState = state.streams[streamName]?.configured;
        updateState("streams", {
            ...state.streams,
            [streamName]: { ...state.streams[streamName], configured: !currentConfiguredState },
        });
    };

    const handleDialogOpen = (row: any) => {
        setActiveRow(row);
        setIsDialogOpen(true);
    };

    const handleDialogClose = () => {
        setIsDialogOpen(false);
        setActiveRow(null);
    };

    const columns = [
        {
            header: "Configured",
            cell: ({ row }: { row: any }) => {
                return (
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
                const rowName = row?.original?.name;
                let jsonSchema = null;
                if (row?.original?.streamProperties?.properties?.json_schema?.default) {
                    jsonSchema =
                        row?.original?.streamProperties?.properties?.json_schema?.default[row?.original?.name].properties;
                }
                return (
                    <>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        disabled={!state.streams[row.getValue("name")]?.configured}
                                        onClick={(event) => {
                                            if (!state.streams[row.getValue("name")]?.configured) {
                                                event.stopPropagation();
                                                return;
                                            }
                                            handleDialogOpen(row);
                                        }}
                                    >
                                        <Pencil2Icon className="w-4 h-4" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Edit stream configuration.</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </>
                );
            },
        },
    ];

    return (
        <div>
            <DataTable actorType="Stream" columns={columns} data={data} clickHandler={handleRowClick} />

            <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
                {activeRow && (
                    <DialogContent className="size-10/12 flex flex-col max-w-none">
                        <div className="flex items-center bg-secondary rounded border h-12 mx-4">
                            <Switch
                                className="ml-5"
                                id={`configured-${activeRow.getValue("name")}`}
                                checked={state.streams[activeRow.getValue("name")].configured}
                                onCheckedChange={(ch: any) =>
                                    updateState("streams", {
                                        ...state.streams,
                                        [activeRow.getValue("name")]: {
                                            ...state.streams[activeRow.getValue("name")],
                                            configured: ch,
                                        },
                                    })
                                }
                            />
                            <div className="flex flex-1 justify-center items-center text-muted-foreground">
                                <p className="text-md text-foreground font-semibold">
                                    Configure <span className="font-bold">{activeRow?.original?.name}</span> Stream
                                </p>
                            </div>
                        </div>

                        <div className="h-full justify-start overflow-hidden mx-4">
                            {activeRow?.original?.streamProperties?.properties?.json_schema?.default &&
                            activeRow?.original?.streamProperties?.properties?.json_schema?.default[activeRow?.original?.name]
                                ?.properties ? (
                                <Tabs defaultValue="stream" className="w-full h-full">
                                    <div className="flex justify-center">
                                        <TabsList className="w-full border">
                                            <TabsTrigger value="stream" className="w-full text-md py-1">
                                                Edit Stream Configuration
                                            </TabsTrigger>
                                            <TabsTrigger value="schema" className="w-full text-md py-1">
                                                Edit Schema
                                            </TabsTrigger>
                                        </TabsList>
                                    </div>

                                    <TabsContent value="stream" className="w-full h-full">
                                        <StreamPanel
                                            srcDocs={docStatus === 200 ? streamDoc : ""}
                                            handleDialogClose={handleDialogClose}
                                            row={activeRow}
                                            handleStreamConfigrationSave={handleStreamConfigrationSave}
                                            state={state}
                                        />
                                    </TabsContent>

                                    <TabsContent value="schema" className="w-full h-full">
                                        <EditSchemaPanel
                                            jsonSchema={
                                                activeRow.original.streamProperties?.properties?.json_schema?.default[
                                                    activeRow?.original?.name
                                                ].properties
                                            }
                                            name={activeRow.getValue("name")}
                                        />
                                    </TabsContent>
                                </Tabs>
                            ) : (
                                <StreamPanel
                                    srcDocs={docStatus === 200 ? streamDoc : ""}
                                    handleDialogClose={handleDialogClose}
                                    row={activeRow}
                                    handleStreamConfigrationSave={handleStreamConfigrationSave}
                                    state={state}
                                />
                            )}
                        </div>
                    </DialogContent>
                )}
            </Dialog>
        </div>
    );
}
