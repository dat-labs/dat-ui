"use client";

import React, { Suspense } from "react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
    BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import ActorForm from "./actor-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function CreatePage({ params }: { params: { actorType: string } }) {
    const router = useRouter();

    const handleFormSubmit = () => {
        toast(`${params.actorType} created successfully.`, {
            description: "New source created successfully",
        });
        router.push(`/actors/${params.actorType}`);
    };
    return (
        <div>
            <div className="flex justify-center">
                <div className="w-6/12">
                    <ActorForm actorType={params.actorType} postFormSubmitActions={handleFormSubmit} />
                </div>
            </div>
        </div>
    );
}
