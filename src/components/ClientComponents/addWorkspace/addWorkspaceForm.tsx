import React, { useState } from "react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { CameraIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import { getSession } from "next-auth/react";
import useApiCall from "@/hooks/useApiCall";
import { createWorkspace } from "./api";
import { toast } from "sonner";
import FormGenerator from "../FormGenerator";
import { Button } from "@/components/ui/button";

export default function AddWorkspaceForm({ postSubmissionAction }: { postSubmissionAction: any }) {
    const [open, setOpen] = useState(false);
    const [error, setError] = useState("");

    const { makeApiCall } = useApiCall(createWorkspace);
    const onSubmit = async (data) => {
        error && setError(null);
        const session = await getSession();
        const body = { ...data, organization_id: session.user.organization_id, status: "active" };
        const res = await makeApiCall(body);

        if (res.status === 200) {
            toast.success("Workspace created sucessfully and added to list.");
            postSubmissionAction();
            setOpen(false);
        } else {
            toast.error("Failed to create Workspace.");
        }
    };

    const handleDialogOpen = (isOpen) => {
        setOpen(isOpen);
    };

    const props: any = {
        name: {
            title: `Workspace Name`,
            type: "string",
            field_name: "name",
        },
    };

    const required_fields = ["name"];

    return (
        <Dialog open={open} onOpenChange={handleDialogOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="bg-muted">
                    Create New Workspace
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[450px] h-fit z-50">
                <DialogHeader>
                    <DialogTitle>Create New Workspace</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-4">
                    {/* <div className="flex justify-between">
                        <div className="flex ">
                            <span className="flex items-center justify-center mr-4 py-2 px-3 rounded-md bg-muted border">
                                <CameraIcon className="size-5" />
                            </span>
                            <div className="flex flex-col text-sm">
                                <p>Your Workspace Logo</p>
                                <p>Max size: 2mb, Min :160x160 </p>
                            </div>
                        </div>

                        <Button variant="outline">Upload</Button>
                    </div> */}
                    <FormGenerator
                        properties={props}
                        onSubmit={onSubmit}
                        errorText={error}
                        required_fields={required_fields}
                        submitButtonText="Submit"
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
}
