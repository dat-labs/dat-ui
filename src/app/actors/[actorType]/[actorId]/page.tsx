"use client";

import { useState, useEffect, useCallback } from "react";
import { getActorData } from "../../api";
import { ActorInstanceData } from "../../actors-table";



interface ActorDetailsPageProps {
    params: {
        actorType: string;
        actorId: string;
    }
}

function ActorDetailsPage(
    { params }: ActorDetailsPageProps
) {
    const { actorType, actorId } = params
    const [actorData, setActorData] = useState([]);

    const load = useCallback(async () => {
        const data: ActorInstanceData[] = await getActorData(
            actorType,
            actorId
        );
        setActorData(data);
    }, [actorType, setActorData])

    useEffect(() => {
        load()
    }
    ,[])

    console.log("actorData", actorData);
    return (
        <div>ActorDetailsPage </div>
    )
}

export default ActorDetailsPage
