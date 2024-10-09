import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useContext, useState, useEffect } from "react";
import FormGenerator from "../FormGenerator";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import DocWrapper from "@/components/commom/doc-wrapper";
import { FromDataContext } from ".";

interface StreamPanelProps {
    srcDocs: string | null;
    row: any;
    handleStreamConfigurationSave: (values: any, streamName: string) => void;
    state: any;
    handleDialogClose: any;
    handleTabChange?: any;
    currentTab?: any;
    handleNextStep: () => void;
}

const StreamPanel: React.FC<StreamPanelProps> = ({
    srcDocs,
    row,
    handleStreamConfigurationSave,
    handleDialogClose,
    handleNextStep,
    handleTabChange,
    currentTab,
}) => {
    const { state, updateState } = useContext(FromDataContext);
    const [formError, setFormError] = useState<string | null>(null); // State to store form errors

    const validateForm = (values: any) => {
        for (const key in values) {
            if (values[key] === "" || values[key] === null || values[key] === undefined) {
                return false; 
            }
        }

        return true;
    };

    return (
        <ResizablePanelGroup direction="horizontal" className="w-full h-full">
            <ResizablePanel defaultSize={srcDocs ? 50 : 100} minSize={30} className="h-full">
                <ScrollArea className="h-full overflow-auto">
                    <div className="w-11/12 mx-auto">
                        <Card className="mt-2 mb-12">
                            <CardContent>
                                <FormGenerator
                                    properties={Object.fromEntries(
                                        Object.entries(row.original.streamProperties.properties).filter(
                                            ([key]) => key !== "upsert_keys" && key !== "cursor_field" && key !== "json_schema"
                                        )
                                    )}
                                    defaultData={state.streams[row.getValue("name")]?.configuration}
                                    onSubmit={(values: any) => {
                                        if (!validateForm(values)) {
                                            setFormError("All fields are required");
                                            return;
                                        }

                                        const streamName = row.getValue("name");
                                        const updatedConfiguration = {
                                            ...state.streams[streamName]?.configuration,
                                            ...Object.fromEntries(
                                                Object.entries(values).filter(
                                                    ([key]) =>
                                                        key !== "upsert_keys" && key !== "cursor_field" && key !== "json_schema"
                                                )
                                            ),
                                        };

                                        updateState("streams", {
                                            ...state.streams,
                                            [streamName]: {
                                                ...state.streams[streamName],
                                                configuration: updatedConfiguration,
                                            },
                                        });

                                        if (
                                            row?.original?.streamProperties?.properties?.json_schema?.default &&
                                            row?.original?.streamProperties?.properties?.json_schema?.default[streamName]
                                                ?.properties
                                        ) {
                                            handleStreamConfigurationSave(updatedConfiguration, streamName);
                                            handleNextStep();
                                        } else {
                                            handleStreamConfigurationSave(updatedConfiguration, streamName);
                                            handleDialogClose();
                                        }
                                    }}
                                />

                                {/* Error Message */}
                                {formError && <p className="text-red-500 mt-2">{formError}</p>}
                            </CardContent>
                        </Card>
                    </div>
                </ScrollArea>
            </ResizablePanel>

            {srcDocs && <ResizableHandle withHandle className="ml-2" />}

            {srcDocs && (
                <ResizablePanel defaultSize={50} minSize={30} className="h-full">
                    <ScrollArea className="h-full overflow-auto pb-4">
                        <DocWrapper doc={srcDocs ? srcDocs : "loading"} url="google.com"></DocWrapper>
                    </ScrollArea>
                </ResizablePanel>
            )}
        </ResizablePanelGroup>
    );
};

export default StreamPanel;
