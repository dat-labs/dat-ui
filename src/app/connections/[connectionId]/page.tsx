"use client";

import React, { Suspense, useCallback, useEffect } from "react";
import { getConnectionData } from "./api";
import PageBreadcrumb from "@/app/page-breadcrumb";
import Loading from "./loading";
import useApiCall from "@/hooks/useApiCall";
import EditConnection from "@/components/ClientComponents/edit-connection";

/**
 * Page component to edit a connection.
 * This component fetches the connection data based on the connection ID provided in the params,
 * and renders the EditConnection component to allow editing of the connection.
 * @param {Object} params - The parameters passed to the component.
 * @param {string} params.connectionId - The ID of the connection to be edited.
 * @returns {JSX.Element} The rendered EditConnectionPage component.
 */
export default async function EditConnectionPage({ params }: { params: any }) {
    const { loading, makeApiCall } = useApiCall(getConnectionData);
    const [connectionData, setConnectionData] = React.useState<any>(null);

    /**
     * Fetches the connection data and updates the state.
     */
    const load = useCallback(async () => {
        const res = await makeApiCall(params.connectionId);
        setConnectionData(res.data);
    }, [params.connectionId, setConnectionData]);

    /**
     * Calls the load function to fetch connection data when the component mounts.
     */
    useEffect(() => {
        load();
    }, []);

    if (loading) {
        return (
            <div className="p-6">
                <Loading />
            </div>
        );
    }
    return (
        <div className="">
            <PageBreadcrumb
                breadCrumbData={[
                    {
                        pageName: "Connections",
                        pageUrl: `/connections`,
                    },
                    {
                        pageName: "Connections",
                    },
                ]}
            />

            {connectionData && <EditConnection connectionData={connectionData} />}
        </div>
    );
}
