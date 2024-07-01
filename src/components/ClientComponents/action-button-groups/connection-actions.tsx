import { manualRunConnection } from "@/app/connections/[connectionId]/api";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import useApiCall from "@/hooks/useApiCall";
import { PlayIcon, TrashIcon } from "@radix-ui/react-icons";
import React, { useState } from "react";
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

// function DeleteAlertDialog() {
//     return (
//         <AlertDialog>
//             <AlertDialogTrigger asChild>
//                 <Button variant="outline">Show Dialog</Button>
//             </AlertDialogTrigger>
//             <AlertDialogContent>
//                 <AlertDialogHeader>
//                     <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
//                     <AlertDialogDescription>
//                         This action cannot be undone. This will permanently delete your account and remove your data from our
//                         servers.
//                     </AlertDialogDescription>
//                 </AlertDialogHeader>
//                 <AlertDialogFooter>
//                     <AlertDialogCancel>Cancel</AlertDialogCancel>
//                     <AlertDialogAction>Continue</AlertDialogAction>
//                 </AlertDialogFooter>
//             </AlertDialogContent>
//         </AlertDialog>
//     );
// }

export default function ConnectionActions({ connectionId }) {
    const router = useRouter();
    const { data: connectionData, makeApiCall: runConnectionCall } = useApiCall(manualRunConnection, "POST");
    const { data: deleteRes, loading, makeApiCall: deleteConnectionCall } = useApiCall(deleteConnection, "DELETE");

    const handleConnectionRun = async (e) => {
        e.stopPropagation();
        await runConnectionCall(connectionId);
    };
    const handleDelete = async (e) => {
        e.stopPropagation();
        await deleteConnectionCall(connectionId);
        router.refresh();
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
