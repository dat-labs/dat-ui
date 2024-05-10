"use client";
import { BreadcrumbContext } from "@/components/ClientComponents/breadcrumb-generator/breadcrumb-context";
import React from "react";

export default function PageBreadcrumb({ breadCrumbData }) {
    const { _, updateState } = React.useContext(BreadcrumbContext);

    React.useEffect(() => {
        updateState("breadcrumbData", breadCrumbData);
    }, []);

    return null;
}
