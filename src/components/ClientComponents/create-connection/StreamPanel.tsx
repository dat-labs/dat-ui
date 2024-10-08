import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import FormGenerator from "../FormGenerator";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import DocWrapper from "@/components/commom/doc-wrapper";

interface StreamPanelProps {
    srcDocs: string | null;
    row: any;
    handleStreamConfigrationSave: (values: any, streamName: string) => void;
    state: any;
    handleDialogClose: any;
    handleTabChange?: any;
    currentTab?: any;
}

const StreamPanel: React.FC<StreamPanelProps> = ({
    srcDocs,
    row,
    handleStreamConfigrationSave,
    state,
    handleDialogClose,
    handleTabChange,
    currentTab,
}) => {
    return (
        <ResizablePanelGroup direction="horizontal" className="w-full h-full">
            <ResizablePanel defaultSize={srcDocs ? 50 : 100} minSize={30} className="h-full">
                <ScrollArea className="h-full overflow-auto">
                    <div className="w-11/12 mx-auto">
                        <Card className="mt-2 mb-12">
                            <CardContent>
                                <FormGenerator
                                    properties={row.original.streamProperties.properties}
                                    required_fields={row.original.streamProperties.required}
                                    defaultData={state.streams[row.getValue("name")]?.configuration}
                                    onSubmit={(values: any) => {
                                        handleStreamConfigrationSave(values, row.getValue("name"));
                                        handleDialogClose();
                                    }}
                                    submitButtonText="Save"
                                    tabChangeAlert={handleTabChange}
                                    currentTab={currentTab}
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
