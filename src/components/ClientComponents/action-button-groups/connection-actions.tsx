import { manualRunConnection, updateConnection } from "@/app/connections/[connectionId]/api";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import useApiCall from "@/hooks/useApiCall";
import { PlayIcon, TrashIcon } from "@radix-ui/react-icons";
import React, { useEffect, useState } from "react";
import { deleteConnection } from "../create-connection/api";
import CircularLoader from "@/components/ui/circularLoader";
import { useRouter } from "next/navigation";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

export default function ConnectionActions({ connectionData }) {
    const router = useRouter();
    const {
        data: connectionRunData,
        statusCode: runStatus,
        makeApiCall: runConnectionCall,
    } = useApiCall(manualRunConnection, "POST");

    const handleConnectionRun = async (e) => {
        e.stopPropagation();
        await runConnectionCall(connectionData.id);
    };

    useEffect(() => {
        if (connectionRunData) {
            if (runStatus == 200) {
                toast.success("Run Initiated");
            } else {
                toast.error("Run Failed to Initiate!");
            }
        }
    }, [connectionRunData]);

    const { loading, makeApiCall: deleteConnectionCall } = useApiCall(updateConnection, "DELETE");

    const handleDelete = async (e) => {
        e.stopPropagation();
        const deleteConnectionData = { ...connectionData, status: "deleted" };
        const res = await deleteConnectionCall(connectionData.id, deleteConnectionData);

        if (res.status === 200) {
            toast.success("Succesfully Deleted Connection !");
            router.refresh();
        } else {
            toast.error("Failed to Delete Connection!");
        }
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
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    disabled={loading}
                                    className="ml-2"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    {loading ? <CircularLoader /> : <TrashIcon className="h-4 w-4" />}
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete your connection from our
                                        servers.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel onClick={(e) => e.stopPropagation()}>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </TooltipTrigger>
                    <TooltipContent>Delete connection</TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    );
}
