"use client";

import { memo, useEffect, useState, useCallback } from "react";
import Link from "next/link";
import clsx from "clsx";
import { buttonVariants } from "@/components/ui/button";
import ConnectionsTable from "./connection-table";
import { getConnectionsData } from "./api";
import Empty from "@/components/commom/empty-component";
import useApiCall from "@/hooks/useApiCall";

/**
 * A wrapper component to fetch and display connections data.
 * It handles the API call to fetch the connections data and conditionally
 * renders either an empty state or the connections table.
 *
 * @returns {JSX.Element} The rendered ConnectionWrapper component.
 */
const ConnectionWrapper = () => {
    const [loadData, setLoadData] = useState([]);

    const { data, makeApiCall } = useApiCall(getConnectionsData);
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
        if (data) {
            setLoadData(data);
        }
    }, [data, setLoadData]);

    return (
        <div>
            {loadData.length === 0 ? (
                <Empty configKey="connection" />
            ) : (
                <div>
                    <div className="my-4 flex justify-between align-middle">
                        <p className="text-lg font-medium">List of Connections:</p>

                        <Link className={clsx(buttonVariants({ variant: "default", size: "sm" }))} href={`/connections/create`}>
                            Create Connection
                        </Link>
                    </div>
                    <ConnectionsTable loadData={loadData} />
                </div>
            )}
        </div>
    );
};

export default memo(ConnectionWrapper);
