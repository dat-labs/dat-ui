"use client";

import { useState, useEffect, useCallback } from "react";
import { getActorData } from "../../api";
import { ActorInstanceData } from "../../actors-table";
import FormGenerator from "@/components/ClientComponents/FormGenerator";

const jsonData = {
    description: "Specification of a connector (source/embeddingsgenerator/destination)",
    type: "object",
    required: ["connection_specification"],
    additionalProperties: true,
    properties: {
        name: {
            type: "string",
            default: "GoogleDrive",
        },
        module_name: {
            type: "string",
            default: "google_drive",
        },
        protocol_version: 1,
        documentation_url: {
            type: "string",
            default: "https://developers.google.com/drive/api/guides/about-sdk",
        },
        changelog_url: {
            type: "string",
            default: "www.example.com",
        },
        connection_specification: {
            description: "ConnectorDefinition specific blob. Must be a valid JSON string.",
            type: "object",
            required: ["client_id", "client_secret", "refresh_token"],
            properties: {
                client_id: {
                    type: "string",
                },
                client_secret: {
                    type: "string",
                },
                refresh_token: {
                    type: "string",
                },
                "dat-name": {
                    type: "string",
                    description: "name of the actor instance",
                    title: "Name",
                    order: -1,
                },
            },
        },
    },
};

interface ActorDetailsPageProps {
    params: {
        actorType: string;
        actorId: string;
    };
}

function ActorDetailsPage({ params }: ActorDetailsPageProps) {
    const { actorType, actorId } = params;
    const [actorData, setActorData] = useState(null);

    const load = useCallback(async () => {
        const data = await getActorData(actorType, actorId);
        data.actor.configuration = jsonData;
        data.configuration["dat-name"] = data.name;
        setActorData(data);
    }, [actorType, setActorData]);

    useEffect(() => {
        load();
    }, []);

    console.log("actorData", actorData);
    return (
        <div>
            {actorData !== null && (
                <div className="flex justify-center">
                    <div className="w-6/12">
                        <FormGenerator
                            properties={actorData.actor.configuration.properties.connection_specification.properties}
                            onSubmit={() => console.log("submitting form")}
                            defaultData={actorData.configuration}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default ActorDetailsPage;
