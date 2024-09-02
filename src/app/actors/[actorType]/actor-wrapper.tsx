"use client";

import { memo, useCallback, useEffect, useState } from "react";
import { getActorsData } from "../api";
import ActorsTable from "../actors-table";
import { getSession } from "next-auth/react";
import useApiCall from "@/hooks/useApiCall";
import Loading from "../loading";

/**
 * Wrapper component that fetches and provides data to the ActorsTable component.
 * @param {any} actorType - The type of actor to be displayed, used to fetch the corresponding data.
 * @returns {JSX.Element} The rendered ActorWrapper component.
 */
const ActorWrapper = ({ actorType }: { actorType: any }) => {
    const [loadData, setLoadData] = useState([]);

    const { data: allInstancesData, statusCode, loading, makeApiCall } = useApiCall(getActorsData);
    /**
     * Makes the API call to fetch instances data on component mount.
     */
    useEffect(() => {
        (async () => {
            const session = await getSession();
            await makeApiCall(actorType, session.user.workspace_id);
        })();
    }, []);

    /**
     * Updates the state with the fetched data when it becomes available.
     */
    useEffect(() => {
        if (allInstancesData) {
            setLoadData(allInstancesData.actorData);
        }
    }, [allInstancesData, setLoadData]);

    return <div>{statusCode !== 200 ? <Loading /> : <ActorsTable actorType={actorType} loadData={loadData} />}</div>;
};

export default memo(ActorWrapper);
