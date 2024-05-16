import { manualRunConnection } from "@/app/connections/[connectionId]/api";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import useApiCall from "@/hooks/useApiCall";
import { PlayIcon, TrashIcon } from "@radix-ui/react-icons";
import React from "react";

export default function ConnectionActions({ connectionId }) {
    const { data, error, loading, statusCode, makeApiCall } = useApiCall(manualRunConnection, "POST");
    const handleConnectionRun = async (e) => {
        e.stopPropagation();
        await makeApiCall(connectionId);
    };
    const handleDelete = async (e) => {
        e.stopPropagation();
        console.log("Deleting the icons");
    };
    return (
        <div>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant="outline" size="icon" onClick={handleConnectionRun} disabled={loading}>
                            <PlayIcon className="h-4 w-4" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>Run connection</TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant="outline" size="icon" onClick={handleDelete} disabled={loading} className="ml-2">
                            <TrashIcon className="h-4 w-4" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>Delete connection</TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    );
}
