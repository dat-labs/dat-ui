// Streams.tsx
import React, { useContext, useState, useEffect } from "react";
import DataTable from "../data-table";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
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

    //  state to track if the documentation has been fetched
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
        if (isStepCompleted) { 
            setCurrentStep((prevStep) => prevStep + 1);
            setIsStepCompleted(false); // Reset step completion status for the next step
        }
    };

    const handlePreviousStep = () => {
        setCurrentStep((prevStep) => Math.max(prevStep - 1, 0)); 
    };

    const handleStreamConfigurationSave = (values: any, streamName: string) => {
        const updatedConfiguration = {
            json_schema: values.json_schema, 
            upsert_keys: values.upsert_keys || [], 
            cursor_field: values.cursor_field || "", 
            name: streamName,
            namespace: values.namespace || "", 
            read_sync_mode: values.read_sync_mode || "FULL_REFRESH",
            write_sync_mode: values.write_sync_mode || "UPSERT",
            advanced: values.advanced || {}, 
        };
    
        console.log(updatedConfiguration);
    
        updateState("streams", {
            ...state.streams,
            [streamName]: { ...state.streams[streamName], configuration: updatedConfiguration },
        });
    };

    const handleStreamConfigurationSubmit = () => {
        setIsStepCompleted(true);  // Mark step as completed
        handleNextStep();  // Trigger next step
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
    ];

    return (
        <div>
            <DataTable actorType="Stream" columns={columns} data={data} clickHandler={handleRowClick} />

            <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
                {activeRow && (
                    <DialogContent className="size-10/12 flex flex-col max-w-none">
                        {/* Stepper */}
                        <div className="w-full mb-4">
                            <div className="flex justify-start gap-5">
                                {/* Step titles */}
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
                                    handleStreamConfigurationSubmit={handleStreamConfigurationSubmit} // Pass handleStreamConfigurationSubmit
                                />
                            ) : (
                                <EditSchemaPanel
                                    jsonSchema={
                                        activeRow.original.streamProperties?.properties?.json_schema?.default[
                                            activeRow?.original?.name
                                        ]?.properties
                                    }
                                    name={activeRow.getValue("name")}
                                />
                            )}
                        </div>

                        <div className="flex justify-between mt-4">
                            {currentStep > 0 && (
                                <Button variant="outline" onClick={handlePreviousStep}>
                                    Back
                                </Button>
                            )}
                            {currentStep < 1 ? (
                                <Button onClick={handleNextStep} disabled={!isStepCompleted}>
                                    Next
                                </Button>
                            ) : (
                                <Button onClick={() => {
                                    const streamName = activeRow?.getValue("name"); 
                                    const configuration = state.streams[streamName]?.configuration; 

                                    handleStreamConfigurationSave(configuration, streamName);
                                    handleDialogClose();
                                }}>
                                    Save & Close
                                </Button>
                            )}
                        </div>
                    </DialogContent>
                )}
            </Dialog>
        </div>
    );
}
