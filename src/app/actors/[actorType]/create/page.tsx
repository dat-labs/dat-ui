"use client";

import React from "react";
import ActorForm from "./actor-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import PageBreadcrumb from "@/app/page-breadcrumb";
import DocWrapper from "../[actorId]/DocWrapper";

export default function CreatePage({ params }: { params: { actorType: string } }) {
    const router = useRouter();

    const handleFormSubmit = () => {
        toast(`${params.actorType} created successfully.`, {
            description: "New source created successfully",
        });
        router.push(`/actors/${params.actorType}`);
    };
    return (
        <div className="p-6">
            <PageBreadcrumb
                breadCrumbData={[
                    {
                        pageName: "Source",
                        pageUrl: `/actors/${params.actorType}`,
                    },
                    {
                        pageName: "Create",
                    },
                ]}
            />
            <div className="flex justify-center">
                <div className="w-full">
                    <ActorForm actorType={params.actorType} postFormSubmitActions={handleFormSubmit} />
                </div>
            </div>
        </div>
    );
}
