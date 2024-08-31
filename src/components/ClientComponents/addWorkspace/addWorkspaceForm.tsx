import React, { useState } from "react";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
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
import { Button } from "../../ui/button";
import { useForm } from "react-hook-form";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { getSession } from "next-auth/react";
import useApiCall from "@/hooks/useApiCall";
import { createWorkspace } from "./api";
import CircularLoader from "@/components/ui/circularLoader";
import { toast } from "sonner";

export default function AddWorkspaceForm({ postSubmissionAction }: { postSubmissionAction: any }) {
    const [open, setOpen] = useState(false);
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors, isSubmitting },
    } = useForm();

    const { makeApiCall } = useApiCall(createWorkspace);
    const onSubmit = async (data) => {
        const session = await getSession();
        const body = { ...data, organization_id: session.user.organization_id };
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
        reset();
    };

    return (
        <Dialog open={open} onOpenChange={handleDialogOpen}>
            <DialogTrigger asChild>
                <span className="m-auto cursor-pointer hover:bg-primary/10 p-2 pr-3">
                    <PlusCircledIcon className="size-6" />
                </span>
            </DialogTrigger>
            <DialogContent className="max-w-[450px] h-fit z-50">
                <DialogHeader>
                    <DialogTitle>Add a new workspace</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-4 py-4 m-0 p-0">
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-4">
                                <Label htmlFor="name" className="text-left">
                                    Name
                                </Label>
                                <Input
                                    id="name"
                                    placeholder="Enter new Workspace name"
                                    autoFocus
                                    {...register("name", {
                                        required: "Name is required",
                                        minLength: {
                                            value: 4,
                                            message: "Name must be at least 4 characters",
                                        },
                                    })}
                                />
                            </div>

                            {errors.name && <p className="text-sm text-right text-red-500">{errors.name.message}</p>}
                        </div>
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-4">
                                <Label htmlFor="status" className="text-left">
                                    Status
                                </Label>
                                <Select
                                    {...register("status", {
                                        required: "Status is required",
                                    })}
                                    onValueChange={(value) => setValue("status", value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="active">active</SelectItem>
                                            <SelectItem value="inactive">inactive</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>

                            {errors.status && <p className="text-sm text-right text-red-500">{errors.status.message}</p>}
                        </div>
                    </div>
                    <DialogFooter className="mt-4">
                        <DialogClose>
                            <Button type="button" variant="outline" className="mr-2" onClick={() => setOpen(false)}>
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? <CircularLoader /> : "Save"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
