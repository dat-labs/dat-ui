import React from "react";
import ConnectionWrapper from "./connection-wrapper";
import PageBreadcrumb from "../page-breadcrumb";

export default function Connections() {
    return (
        <div className="p-6">
            <PageBreadcrumb
                breadCrumbData={[
                    {
                        pageName: "Connections",
                        pageUrl: `/connections`,
                    },
                ]}
            />
           <ConnectionWrapper />
        </div>
    );
}
