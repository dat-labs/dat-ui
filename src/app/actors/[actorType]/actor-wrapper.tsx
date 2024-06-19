"use client";

import { memo, useCallback, useEffect, useState } from "react";
import { getActorsData } from "../api";
import ActorsTable from "../actors-table";

/**
 * Wrapper component that fetches and provides data to the ActorsTable component.
 * @param {any} actorType - The type of actor to be displayed, used to fetch the corresponding data.
 * @returns {JSX.Element} The rendered ActorWrapper component.
 */
const ActorWrapper = ({ actorType }: { actorType: any }) => {
    const [loadData, setLoadData] = useState([]);

    const load = useCallback(async () => {
        console.log("Effect");
        const data = await getActorsData(actorType);
        setLoadData(data);
    }, [actorType, setLoadData]);

    useEffect(() => {
        load();
    }, []);

    return <ActorsTable actorType={actorType} loadData={loadData} />;
};

export default memo(ActorWrapper);
