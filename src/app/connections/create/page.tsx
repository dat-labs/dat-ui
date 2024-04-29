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

export default function ConnectionsCreatePage() {
    return (
        <div>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href={`/connections`}>Connections</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Create</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <CreateConnectionsForm />
        </div>
    );
}
