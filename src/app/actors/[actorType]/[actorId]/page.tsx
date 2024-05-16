"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { getActorData, getActorSpec } from "../../api";
import { toast } from "sonner";
import FormGenerator from "@/components/ClientComponents/FormGenerator";
import { updateActorInstance } from "./api";
import DocWrapper from "@/components/commom/doc-wrapper";
import PageBreadcrumb from "@/app/page-breadcrumb";
import { capitalizeFirstLetter } from "@/lib/utils";


interface ActorDetailsPageProps {
    params: {
        actorType: string;
        actorId: string;
    };
}

function ActorDetailsPage({ params }: ActorDetailsPageProps) {
    const router = useRouter();

    const { actorType, actorId } = params;
    const [actorInstanceData, setActorInstanceData] = useState(null);
    const  [actorSpecData, setActorSpecData] = useState(null);

    const load = useCallback(async () => {
        const data = await getActorData(actorType, actorId);
        const jsonData = await getActorSpec(data.actor.id);
        setActorInstanceData(data);
        setActorSpecData(jsonData)
    }, [actorType, setActorInstanceData]);

    useEffect(() => {
        load();
    }, []);

    const handleSubmit = async (data: any) => {
        let apiData = {
            name: data["dat-name"],
            configuration: data,
        };
        const res = await updateActorInstance(actorId,apiData);
        //TODO test status check
        if(res.status === 200){
            router.push(`/actors/${params.actorType}`);
            toast(`${actorType} updated successfully.`, {
                description: `${actorType} updated successfully.`,
            });
        } else {
            toast(`${actorType} update failed.`, {
                description: `${actorType} update failed.`,
            });
        }
    };

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
            </div>
            <DocWrapper doc="Edit Page doc" url="https://google.co.in">
            {actorInstanceData !== null && (
                <div className="flex justify-center">
                    <div className="w-11/12">
                        <FormGenerator
                            properties={actorSpecData.properties.connection_specification.properties}
                            onSubmit={handleSubmit}
                            defaultData={actorInstanceData.configuration}
                        />
                    </div>
                </div>
            )}
        </DocWrapper>
        </main>
        
    );
}

export default ActorDetailsPage;
