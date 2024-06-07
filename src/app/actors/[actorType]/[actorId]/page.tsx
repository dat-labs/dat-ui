"use client";

import PageBreadcrumb from "@/app/page-breadcrumb";
import { capitalizeFirstLetter } from "@/lib/utils";
import ActorForm from "../create/actor-form";

interface ActorDetailsPageProps {
    params: {
        actorType: string;
        actorId: string;
    };
}

function ActorDetailsPage({ params }: ActorDetailsPageProps) {
    const { actorType, actorId } = params;

    return (
        <main>
            <div className="my-4 flex justify-between">
                <PageBreadcrumb
                    breadCrumbData={[
                        {
                            pageName: `${capitalizeFirstLetter(actorType)}`,
                            pageUrl: `/actors/${actorType}`,
                        },
                        {
                            pageName: "Edit",
                        },
                    ]}
                />

                <div className="flex flex-row w-full">
                    <div className="w-full ml-4">
                        {/* Edit Mode Actor Form */}
                        <ActorForm actorType={params.actorType} actorId={params.actorId} editMode={true} />
                    </div>
                </div>
            </div>
        </main>
    );
}

export default ActorDetailsPage;
