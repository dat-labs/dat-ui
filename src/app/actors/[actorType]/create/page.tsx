"use client";

import React from "react";
import ActorForm from "./actor-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import PageBreadcrumb from "@/app/page-breadcrumb";
import DocWrapper from "@/components/commom/doc-wrapper";
import { capitalizeFirstLetter } from "@/lib/utils";
import { SearchBar } from "@/components/commom/search-bar";

export default function CreatePage({ params }: { params: { actorType: string } }) {
    const router = useRouter();
    const actorType = params.actorType;

    const handleFormSubmit = () => {
        toast(`${actorType} created successfully.`, {
            description: "New source created successfully",
        });
        router.push(`/actors/${params.actorType}`);
    };
    return (
        <div>
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
            <SearchBar />
            <ActorForm actorType={params.actorType} postFormSubmitActions={handleFormSubmit} />
        </div>
    );
}
