"use client";

import { memo, useEffect, useState, useCallback } from "react";
import Link from "next/link";
import clsx from "clsx";
import { buttonVariants } from "@/components/ui/button";
import ConnectionsTable from "./connection-table";
import { getConnectionsData } from "./api";
import Empty from "@/components/commom/empty-component";

const ConnectionWrapper = () => {
    const [loadData, setLoadData] = useState([]);

    const load = useCallback(async () => {
        const data = await getConnectionsData();
        setLoadData(data);
        // setLoadData([]);
    }, [setLoadData]);

    useEffect(() => {
        load();
    }, []);

    return (
        <div>
            {loadData.length === 0 ? (
                <Empty configKey="connection"/>
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
