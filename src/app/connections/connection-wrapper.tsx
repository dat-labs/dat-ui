"use client";

import { memo, useEffect, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { buttonVariants } from "@/components/ui/button";
import ConnectionsTable from "./connection-table";
import { getConnectionsData } from "./api";
import Empty from "@/components/commom/empty-component";
import useApiCall from "@/hooks/useApiCall";
import Loading from "./[connectionId]/loading";

/**
 * A wrapper component to fetch and display connections data.
 * It handles the API call to fetch the connections data and conditionally
 * renders either an empty state or the connections table.
 *
 * @returns {JSX.Element} The rendered ConnectionWrapper component.
 */
const ConnectionWrapper = () => {
    const [loadData, setLoadData] = useState([]);

    const { data: allConnectionsData, statusCode, loading, makeApiCall } = useApiCall(getConnectionsData);
    /**
     * Makes the API call to fetch connections data on component mount.
     */
    useEffect(() => {
        (async () => {
            await makeApiCall();
        })();
    }, []);

    /**
     * Updates the state with the fetched data when it becomes available.
     */
    useEffect(() => {
        if (allConnectionsData) {
            setLoadData(allConnectionsData.data);
        }
    }, [allConnectionsData, setLoadData]);

    return (
        <div>
            {loading ? (
                <Loading />
            ) : loadData.length > 0 ? (
                <div>
                    <div className="my-4 flex justify-between align-middle">
                        <p className="text-lg font-medium">List of Connections:</p>

                        <Link className={clsx(buttonVariants({ variant: "default", size: "sm" }))} href={`/connections/create`}>
                            Create Connection
                        </Link>
                    </div>

                    <ConnectionsTable loadData={loadData} />
                </div>
            ) : (
                statusCode == 200 && <Empty configKey="connection" />
            )}
        </div>
    );
};

export default memo(ConnectionWrapper);
