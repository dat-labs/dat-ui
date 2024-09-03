"use client";

import { memo, useCallback, useContext, useEffect, useState } from "react";
import { getActorsData } from "../api";
import ActorsTable from "../actors-table";
import useApiCall from "@/hooks/useApiCall";
import Loading from "../loading";
import { WorkspaceDataContext } from "@/components/ClientComponents/workspace-provider";

/**
 * Wrapper component that fetches and provides data to the ActorsTable component.
 * @param {any} actorType - The type of actor to be displayed, used to fetch the corresponding data.
 * @returns {JSX.Element} The rendered ActorWrapper component.
 */
const ActorWrapper = ({ actorType }: { actorType: any }) => {
    const [loadData, setLoadData] = useState([]);
    const { curWorkspace } = useContext(WorkspaceDataContext);

    const { data: allInstancesData, statusCode, loading, makeApiCall } = useApiCall(getActorsData);
    /**
     * Makes the API call to fetch instances data on component mount.
     */
    useEffect(() => {
        (async () => {
            await makeApiCall(actorType, curWorkspace.id);
        })();
    }, [curWorkspace]);

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
