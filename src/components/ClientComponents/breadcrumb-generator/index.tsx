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
                <Breadcrumb>
                    <BreadcrumbList>
                        {state.breadcrumbData.map((data: any, index: number) => (
                            <React.Fragment key={data.pageUrl || index}>
                                {index < state.breadcrumbData.length - 1 && (
                                    <>
                                        <BreadcrumbItem key={`item-${index}`}>
                                            <BreadcrumbLink href={data.pageUrl}>
                                                {data.pageName}
                                            </BreadcrumbLink>
                                        </BreadcrumbItem>
                                        <BreadcrumbSeparator key={`sep-${index}`} />
                                    </>
                                )}
                                {index === state.breadcrumbData.length - 1 && (
                                    <BreadcrumbItem key={`current-${index}`}>
                                        <BreadcrumbPage>{data.pageName}</BreadcrumbPage>
                                    </BreadcrumbItem>
                                )}
                            </React.Fragment>
                        ))}
                    </BreadcrumbList>
                </Breadcrumb>
            ) : (
                <p>dat</p>
            )}
        </div>
    );
}
