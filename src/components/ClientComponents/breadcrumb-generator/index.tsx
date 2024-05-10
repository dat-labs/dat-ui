"use client";

import React from "react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
    BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { BreadcrumbContext } from "./breadcrumb-context";

export default function BreadCrumbGenerator() {
    const { state } = React.useContext(BreadcrumbContext);
    return (
        <div>
            {state.breadcrumbData ? (
                <>
                    <Breadcrumb>
                        <BreadcrumbList>
                            {state.breadcrumbData.map((data: any, index: number) => (
                                <>
                                    {index < state.breadcrumbData.length - 1 && (
                                        <BreadcrumbItem>
                                            <BreadcrumbLink href={data.pageUrl}>{data.pageName}</BreadcrumbLink>
                                        </BreadcrumbItem>
                                    )}
                                    {index < state.breadcrumbData.length - 1 && <BreadcrumbSeparator />}
                                    {index === state.breadcrumbData.length - 1 && (
                                        <BreadcrumbItem>
                                            <BreadcrumbPage>{data.pageName}</BreadcrumbPage>
                                        </BreadcrumbItem>
                                    )}
                                </>
                            ))}
                        </BreadcrumbList>
                    </Breadcrumb>
                </>
            ) : (
                <p>dat</p>
            )}
        </div>
    );
}
