import React from "react";
import Link from "next/link";
import clsx from "clsx";
import { buttonVariants } from "@/components/ui/button";
import ConnectionsTable from "./connection-table";
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
            <div className="my-4 flex justify-between align-middle">
                <p className="text-lg font-medium">List of Connections:</p>

                <Link className={clsx(buttonVariants({ variant: "default", size: "sm" }))} href={`/connections/create`}>
                    Create Connection
                </Link>
            </div>
            <ConnectionsTable />
        </div>
    );
}
