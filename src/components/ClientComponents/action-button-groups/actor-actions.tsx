import { deleteActorInstance } from "@/app/actors/[actorType]/[actorId]/api";
import { Button } from "@/components/ui/button";
import CircularLoader from "@/components/ui/circularLoader";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import useApiCall from "@/hooks/useApiCall";
import { TrashIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import React from "react";

/**
 * ActorActions component handles actions related to an actor instance,
 * such as deleting the actor.
 * @param {string} actorId The ID of the actor instance to delete.
 * @returns {JSX.Element} The rendered ActorActions component.
 */
export default function ActorActions({ actorId, connection_count }) {
    const router = useRouter();
    const { data, error, loading, statusCode, makeApiCall } = useApiCall(deleteActorInstance, "DELETE");

    /**
     * Handles the click event to delete the actor instance.
     * Stops event propagation to prevent parent elements from triggering the same action.
     * Makes an API call to delete the actor instance with the specified actorId.
     * Refreshes the router after deletion.
     *
     * @param {React.MouseEvent} e The click event.
     */
    const handleActorInstanceDelete = async (e) => {
        e.stopPropagation();
        await makeApiCall(actorId);
        router.refresh();
    };

    return (
        <div>
            {!loading ? (
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={handleActorInstanceDelete}
                                disabled={loading || connection_count > 0}
                                className="ml-2"
                            >
                                <TrashIcon className="h-4 w-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Delete actor</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            ) : (
                <CircularLoader />
            )}
        </div>
    );
}
