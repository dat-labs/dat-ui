import PageBreadcrumb from "@/app/page-breadcrumb";
import React from "react";

export default function ConnectionEditPage() {
    return (
        <div>
            <PageBreadcrumb
                breadCrumbData={[
                    {
                        pageName: "Connections",
                        pageUrl: `/connections`,
                    },
                    {
                        pageName: "Edit",
                    },
                ]}
            />
        </div>
    );
}
