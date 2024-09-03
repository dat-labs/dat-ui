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
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { getSession } from "next-auth/react";
import useApiCall from "@/hooks/useApiCall";
import { createWorkspace } from "./api";
import { toast } from "sonner";
import FormGenerator from "../FormGenerator";

export default function AddWorkspaceForm({ postSubmissionAction }: { postSubmissionAction: any }) {
    const [open, setOpen] = useState(false);
    const [error, setError] = useState("");
    error && setError(null);

    const { makeApiCall } = useApiCall(createWorkspace);
    const onSubmit = async (data) => {
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
            title: "New Workspace name",
            type: "string",
            field_name: "name",
        },
    };

    const required_fields = ["name"];

    return (
        <Dialog open={open} onOpenChange={handleDialogOpen}>
            <DialogTrigger asChild>
                <PlusCircledIcon className="size-6" />
            </DialogTrigger>
            <DialogContent className="max-w-[450px] h-fit z-50">
                <FormGenerator
                    properties={props}
                    onSubmit={onSubmit}
                    errorText={error}
                    required_fields={required_fields}
                    submitButtonText="Submit"
                />
            </DialogContent>
        </Dialog>
    );
}
