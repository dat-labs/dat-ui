import React from "react";
import DataTable from "../data-table";
import { Button } from "@/components/ui/button";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { Switch } from "@/components/ui/switch";
import { FromDataContext } from ".";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import FormGenerator from "../FormGenerator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import DocWrapper from "@/components/commom/doc-wrapper";
import Loading from "@/app/actors/loading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";

export default function Streams({ data, loading }: { data: any; loading: boolean }) {
    const { state, updateState } = React.useContext(FromDataContext);

    const ifDocs = true;

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
                                                disabled={!state.streams[row.getValue("name")]?.configured}
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

                            <DialogContent className="flex flex-row size-10/12 max-w-none">
                                <ResizablePanelGroup direction="horizontal" className="w-full h-full pt-4">
                                    <ResizablePanel defaultSize={ifDocs ? 50 : 100} minSize={30} className="h-full">
                                        <ScrollArea className="h-full overflow-auto">
                                            <div className="w-11/12 mx-auto">
                                                <Card className="my-2">
                                                    <CardHeader>
                                                        <CardTitle className="text-lg font-bold">
                                                            Edit stream configuration
                                                        </CardTitle>
                                                    </CardHeader>
                                                    <CardContent>
                                                        <FormGenerator
                                                            properties={row.original.streamProperties.properties}
                                                            defaultData={state.streams[row.getValue("name")]?.configuration}
                                                            onSubmit={(values: any) =>
                                                                handleStreamConfigrationSave(values, row.getValue("name"))
                                                            }
                                                        />
                                                    </CardContent>
                                                </Card>
                                            </div>
                                        </ScrollArea>
                                    </ResizablePanel>

                                    {ifDocs && <ResizableHandle className="ml-2" />}

                                    {ifDocs && (
                                        <ResizablePanel defaultSize={50} minSize={30} className="h-full">
                                            <ScrollArea className="h-full overflow-auto">
                                                <DocWrapper doc="Edit a Stream" url="google.com" editMode={true}>
                                                    <div className="p-6">
                                                        <DialogHeader>
                                                            <DialogTitle className="mb-4">
                                                                Configure {row.getValue("name")} stream
                                                            </DialogTitle>
                                                        </DialogHeader>
                                                    </div>
                                                </DocWrapper>
                                            </ScrollArea>
                                        </ResizablePanel>
                                    )}
                                </ResizablePanelGroup>
                            </DialogContent>
                        </Dialog>
                    </>
                );
            },
        },
    ];
    return <div>{loading ? <Loading /> : <DataTable actorType="Stream" columns={columns} data={data} />}</div>;
}
