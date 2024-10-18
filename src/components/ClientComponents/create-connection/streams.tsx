import React, { useContext, useState, useEffect } from "react";
import DataTable from "../data-table";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { FromDataContext } from ".";
import StreamPanel from "./StreamPanel";
import EditSchemaPanel from "./editSchemaPanel";
import useApiCall from "@/hooks/useApiCall";
import { getActorDocumentation } from "@/app/actors/[actorType]/create/api";

export default function Streams({ data }: { data: any }) {
    const { state, updateState } = useContext(FromDataContext);
    
    const [streamDoc, setStreamDoc] = useState(null);
    const { data: docData, statusCode: docStatus, makeApiCall } = useApiCall(getActorDocumentation);
    
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [activeRow, setActiveRow] = useState<any>(null);
    const [currentStep, setCurrentStep] = useState(0);
    const [isStepCompleted, setIsStepCompleted] = useState(false);

    const [hasFetchedDoc, setHasFetchedDoc] = useState(false);
    const [actorName, setActorName] = useState<string | null>(null);

    useEffect(() => {
        const newActorName = state.source?.value?.actor?.module_name?.replace("_", "-");
        if (newActorName !== actorName) {
            setActorName(newActorName);
            setHasFetchedDoc(false);
        }
    }, [state.source, actorName]);

    useEffect(() => {
        if (actorName && !hasFetchedDoc) {
            const docPath = `overview/core-concepts/stream`;
            (async () => {
                await makeApiCall(docPath);
                setHasFetchedDoc(true);
            })();
        }
    }, [makeApiCall, actorName, hasFetchedDoc]); 

    useEffect(() => {
        if (docData) {
            setStreamDoc(docData.responseData);
        }
    }, [docData]);

    const handleRowClick = (row: any) => {
        handleDialogOpen(row);
    };

    const handleDialogOpen = (row: any) => {
        setActiveRow(row);
        setIsDialogOpen(true);
        setCurrentStep(0);
        setIsStepCompleted(false); 
    };

    const handleDialogClose = () => {
        setIsDialogOpen(false);
        setActiveRow(null);
    };

    const handleNextStep = () => {
        setCurrentStep((prevStep) => prevStep + 1); 
        setIsStepCompleted(false);
    };

    const handlePreviousStep = () => {
        setCurrentStep((prevStep) => Math.max(prevStep - 1, 0)); 
    };

    const handleStreamConfigurationSave = (values: any, streamName: string) => {
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
                    <Switch
                        id={`configured-${row.getValue("name")}`}
                        checked={row.original.configured}
                        onClick={(e) => e.stopPropagation()} 
                        onCheckedChange={(checked: any) => {
                            updateState("streams", {
                                ...state.streams,
                                [row.getValue("name")]: { ...state.streams[row.getValue("name")], configured: checked },
                            });
    
                            if (checked) {
                                handleRowClick(row); 
                            }
                        }}
                    />
                );
            },
        },
        {
            accessorKey: "name",
            header: "Stream Name",
        },
    ];

    return (
        <div>
            <DataTable actorType="Stream" columns={columns} data={data} clickHandler={handleRowClick} />

            <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
                {activeRow && (
                    <DialogContent aria-describedby="configure-streams" className="size-10/12 flex flex-col max-w-none">
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
                        {/* Conditional Rendering Based on json_schema Check */}
                        {activeRow?.original?.streamProperties?.properties?.json_schema?.default &&
                        activeRow?.original?.streamProperties?.properties?.json_schema?.default[activeRow?.original?.name]?.properties ? (
                            <>
                               
                                <div className="mx-4 mb-4">
                                    <div className="flex justify-start gap-5">
                                        {["Configuration", "Edit Schema"].map((stepTitle, index) => (
                                            <div key={index} className="flex items-center">
                                                <div
                                                    className={`w-5 h-5 rounded-full ${
                                                        index === currentStep
                                                            ? "bg-primary text-primary-foreground"
                                                            : index < currentStep
                                                            ? "dark:bg-green-500 bg-green-400"
                                                            : "bg-gray-300"
                                                    } flex items-center justify-center`}
                                                >
                                                    {index < currentStep ? (
                                                        <span className="text-sm font-bold">&#10003;</span>
                                                    ) : (
                                                        index + 1
                                                    )}
                                                </div>
                                                <span className="ml-2 text-sm">{stepTitle}</span>
                                                {index < 1 && (
                                                    <img
                                                        width="15"
                                                        height="10px"
                                                        alt="separator icon"
                                                        className="h-3 w-3 ml-4"
                                                        src="https://cdn0.iconfinder.com/data/icons/mintab-outline-for-ios-4/30/toward-forward-more-than-angle-bracket-512.png"
                                                    />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                    <Separator className="mt-3" />
                                </div>

                                <div className="h-full justify-start overflow-hidden mx-4">
                                       
                                    {currentStep === 0 ? (
                                        <StreamPanel
                                            srcDocs={docStatus === 200 ? streamDoc : ""}
                                            handleDialogClose={handleDialogClose}
                                            row={activeRow}
                                            state={state}
                                            handleNextStep={handleNextStep}
                                            handleStreamConfigurationSave={handleStreamConfigurationSave}
                                        />
                                    ) : (
                                        
                                        <EditSchemaPanel
                                            jsonSchema={
                                                activeRow.original.streamProperties?.properties?.json_schema?.default[
                                                    activeRow?.original?.name
                                                ]?.properties
                                            }
                                            name={activeRow.getValue("name")}
                                            handleStreamConfigurationSave={handleStreamConfigurationSave}
                                            handlePreviousStep={handlePreviousStep}
                                            handleDialogClose={handleDialogClose}
                                        />
                                    )}

                                
                                </div>

                            </>
                        ) : (
                            <StreamPanel
                                srcDocs={docStatus === 200 ? streamDoc : ""}
                                handleDialogClose={handleDialogClose}
                                row={activeRow}
                                state={state}
                                handleStreamConfigurationSave={handleStreamConfigurationSave}
                            />
                        )}
                    </DialogContent>
                )}
            </Dialog>
        </div>
    );
}
