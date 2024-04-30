import React from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "@/components/ui/breadcrumb";
import Link from "next/link";
import clsx from "clsx";
import { buttonVariants } from "@/components/ui/button";
import ConnectionsTable from "./connection-table";

export default function Connections() {
    return (
        <>
            <div className="my-4 flex justify-between align-middle">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href={`/connections`}>Connections</BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <Link className={clsx(buttonVariants({ variant: "default", size: "sm" }))} href={`/connections/create`}>
                    Create Connection
                </Link>
            </div>
            <ConnectionsTable />
        </>
    );
}
