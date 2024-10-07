import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useContext, useState,useEffect } from "react";
import FormGenerator from "../FormGenerator";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import DocWrapper from "@/components/commom/doc-wrapper";
import { FromDataContext } from ".";


interface StreamPanelProps {
    srcDocs: string | null;
    row: any;
    handleStreamConfigurationSubmit: (values: any, streamName: string) => void;
    handleStreamConfigurationSave: (values: any, streamName: string) => void;
    state: any;
    handleDialogClose: any;
    handleTabChange?: any;
    currentTab?: any;
}

const StreamPanel: React.FC<StreamPanelProps> = ({
    srcDocs,
    row,
    handleStreamConfigurationSubmit,
    handleStreamConfigurationSave,
    handleDialogClose,
    handleTabChange,
    currentTab,
}) => {
    const { state, updateState } = useContext(FromDataContext);

    useEffect(() => {
        const streamName = row.getValue("name");
        console.log("Updated state for stream:", state.streams[streamName]);
    }, [state.streams]); // This will log the updated state after the state update
    

    return (
        <ResizablePanelGroup direction="horizontal" className="w-full h-full">
            <ResizablePanel defaultSize={srcDocs ? 50 : 100} minSize={30} className="h-full">
                <ScrollArea className="h-full overflow-auto">
                    <div className="w-11/12 mx-auto">
                        <Card className="mt-2 mb-12">
                            <CardContent>
                            <FormGenerator
    properties={{
        namespace: row.original.streamProperties.properties.namespace,
        read_sync_mode: row.original.streamProperties.properties.read_sync_mode,
        write_sync_mode: row.original.streamProperties.properties.write_sync_mode,
        advanced: row.original.streamProperties.properties.advanced,
    }}
    defaultData={state.streams[row.getValue("name")]?.configuration}
    onSubmit={(values: any) => {
        const streamName = row.getValue("name");
        console.log(values)
        updateState("streams", {
            ...state.streams,
            [streamName]: {
                ...state.streams[streamName],
                configuration: {
                    namespace: values.namespace,
                    read_sync_mode: values.read_sync_mode,
                    write_sync_mode: values.write_sync_mode,
                    advanced: values.advanced,
                },
            },
        });

        handleStreamConfigurationSubmit();
        console.log("Form submitted and state updated.");
    }}
/>

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
