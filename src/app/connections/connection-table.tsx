"use client";

import { memo, useEffect, useMemo, useState, useCallback } from "react";
import DataTable from "@/components/ClientComponents/data-table";
import { getConnectionsData } from "./api";
import Link from "next/link";

const getColumns = () => {
    return [
        {
            accessorKey: "name",
            header: "Name",
        },
        {
            accessorKey: "status",
            header: "Status",
        },
    ];
};

function ConnectionsTable() {
    const [loadData, setLoadData] = useState([]);

    const load = useCallback(async () => {
        const data = await getConnectionsData();
        setLoadData(data);
    }, [setLoadData]);

    useEffect(() => {
        load();
    }, []);

    const columns = useMemo(() => getColumns(), []);
    return <DataTable columns={columns} data={loadData} />;
}

export default memo(ConnectionsTable);
