import React from "react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
    BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import CreateConnectionsForm from "@/components/ClientComponents/create-connection";
import PageBreadcrumb from "@/app/page-breadcrumb";

export default function ConnectionsCreatePage() {
    return (
        <div>
            <PageBreadcrumb
                breadCrumbData={[
                    {
                        pageName: "Connections",
                        pageUrl: `/connections`,
                    },
                    {
                        pageName: "Create",
                    },
                ]}
            />
            <CreateConnectionsForm />
        </div>
    );
}
