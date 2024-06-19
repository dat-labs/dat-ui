import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading({ height = "300px" }) {
    return <Skeleton className={`h-[${height}] w-full rounded-xl p-6`} />;
}
