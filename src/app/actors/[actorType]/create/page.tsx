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
        <div>
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
            <DocWrapper doc="Create Page doc">
                <div className="flex justify-center">
                    <div className="w-6/12">
                        <ActorForm actorType={params.actorType} postFormSubmitActions={handleFormSubmit} />
                    </div>
                </div>
            </DocWrapper>
        </div>
    );
}
