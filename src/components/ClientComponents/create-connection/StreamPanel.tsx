import React, { useContext, useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import FormGenerator from "../FormGenerator";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import DocWrapper from "@/components/commom/doc-wrapper";
import { getSession } from "next-auth/react";
import { FromDataContext } from ".";

interface StreamPanelProps {
    srcDocs: string | null;
    row: any;
    handleStreamConfigurationSave: (values: any, streamName: string) => void;
    state: any;
    handleDrawerClose: any;
    handleNextStep?: () => void;
}

const StreamPanel: React.FC<StreamPanelProps> = ({
    srcDocs,
    row,
    handleStreamConfigurationSave,
    handleDrawerClose,
    handleNextStep,
}) => {
    const { state, updateState } = useContext(FromDataContext);
    const [formError, setFormError] = useState<string | null>(null);
    const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
    const [localFileNames, setLocalFileNames] = useState<string[]>([]);
    const [targetPath, setTargetPath] = useState<string | null>(null); 

    const existingUploadedFiles = state.streams[row.getValue("name")]?.configuration?.obj_file_paths || [];
    const existingLocalFileNames = state.streams[row.getValue("name")]?.configuration?.local_file_paths || [];

    useEffect(() => {
        const fetchSessionData = async () => {
            const session = await getSession();
            const workspace_id = session?.user?.workspace_id;
            const user_id = session?.user?.id; 
            const actorName = state.source?.value?.actor?.module_name || null;

            if (workspace_id && user_id && actorName) {
                const newPath = `${workspace_id}/${user_id}/${actorName}`;
                setTargetPath(newPath);
            }
        };

        fetchSessionData();
    }, [state]); 

    const handleUploadResponse = (responses: any[]) => {
        const allUploadedFiles = responses.flatMap((response: any) => response.responseData?.uploaded_files || []);
        const allLocalFileNames = responses.flatMap((response: any) => response.responseData?.local_file_names || []);
        setUploadedFiles(allUploadedFiles);
        setLocalFileNames(allLocalFileNames);
    };

    const handleSubmit = async (values: any) => {
        const streamName = row.getValue("name");
        const updatedConfiguration = {
            ...state.streams[streamName]?.configuration,
            ...Object.fromEntries(
                Object.entries(values).filter(([key]) => key !== "upsert_keys" && key !== "cursor_field" && key !== "json_schema")
            ),
            obj_file_paths: uploadedFiles.length ? uploadedFiles : existingUploadedFiles,
            local_file_paths: localFileNames.length ? localFileNames : existingLocalFileNames,
        };

        handleStreamConfigurationSave(updatedConfiguration, streamName);

        if (
            row?.original?.streamProperties?.properties?.json_schema?.default &&
            row?.original?.streamProperties?.properties?.json_schema?.default[streamName]?.properties
        ) {
            handleNextStep?.();
        } else {
            handleDrawerClose();
        }
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
                                            ([key]) =>
                                                key !== "upsert_keys" &&
                                                key !== "cursor_field" &&
                                                key !== "json_schema" &&
                                                key !== "obj_file_paths"
                                        )
                                    )}
                                    required_fields={row.original.streamProperties.properties.required}
                                    defaultData={state.streams[row.getValue("name")]?.configuration}
                                    onSubmit={handleSubmit}
                                    onUploadResponse={handleUploadResponse}
                                    existingFiles={existingLocalFileNames}
                                    targetPath={targetPath}
                                />

                                {formError && <p className="mt-2 text-red-600">{formError}</p>}
                            </CardContent>
                        </Card>
                    </div>
                </ScrollArea>
            </ResizablePanel>

            {srcDocs && <ResizableHandle withHandle className="ml-2" />}

            {srcDocs && (
                <ResizablePanel defaultSize={50} minSize={30} className="h-full">
                    <ScrollArea className="h-full overflow-auto pb-4">
                        <DocWrapper doc={srcDocs ? srcDocs : "loading"} url="google.com" />
                    </ScrollArea>
                </ResizablePanel>
            )}
        </ResizablePanelGroup>
    );
};

export default StreamPanel;