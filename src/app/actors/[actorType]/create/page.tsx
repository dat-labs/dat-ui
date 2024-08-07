"use client";

import React from "react";
import ActorForm from "./actor-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import PageBreadcrumb from "@/app/page-breadcrumb";
import DocWrapper from "@/components/commom/doc-wrapper";
import { capitalizeFirstLetter } from "@/lib/utils";

/**
 * @returns Page to create a new actor
 */
export default function CreatePage({ params }: { params: { actorType: string } }) {
    const router = useRouter();
    const actorType = params.actorType;

    /**
     * Redirects after creation of new Actor.
     */
    const handleFormSubmit = () => {
        toast(`${actorType} created successfully.`, {
            description: "New source created successfully",
        });
        router.push(`/actors/${params.actorType}`);
    };

    return (
        <div className="">
            <PageBreadcrumb
                breadCrumbData={[
                    {
                        pageName: `${capitalizeFirstLetter(actorType)}`,
                        pageUrl: `/actors/${params.actorType}`,
                    },
                    {
                        pageName: "Create",
                    },
                ]}
            />
            {/* Create Mode Actor Form */}
            <ActorForm actorType={params.actorType} postFormSubmitActions={handleFormSubmit} editMode={false} />
        </div>
    );
}
