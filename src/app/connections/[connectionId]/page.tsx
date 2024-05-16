"use client";

import React, { Suspense } from "react";
import { getConnectionData } from "./api";
import PageBreadcrumb from "@/app/page-breadcrumb";
import Loading from "./loading";
import useApiCall from "@/hooks/useApiCall";
import EditConnection from "@/components/ClientComponents/edit-connection";

export default function EditConnectionPage({ params }: { params: any }) {
    const { data, error, loading, statusCode } = useApiCall(() => getConnectionData(params.connectionId));
    console.log(data);

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
            {data && <EditConnection connectionData={data} />}
        </div>
    );
}
