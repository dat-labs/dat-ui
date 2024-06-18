import { Suspense, useCallback, useEffect, useState } from "react";
import Loading from "../loading";
import ActorsTable from "../actors-table";
import { capitalizeFirstLetter } from "@/lib/utils";
import NotFound from "./not-found";
import { Button, buttonVariants } from "@/components/ui/button";
import clsx from "clsx";
import Link from "next/link";
import PageBreadcrumb from "@/app/page-breadcrumb";
import { getActorsData } from "../api";
import ActorWrapper from "./actor-wrapper";

interface pageProps {
    params: {
        actorType: string;
    };
}

// Create an array of actors
const actors = ["source", "generator", "destination"];

export default function ActorsPage({ params }: pageProps) {
    const { actorType } = params;
    if (!actors.includes(actorType)) {
        return <NotFound />;
    }
    const title = capitalizeFirstLetter(actorType);

    return (
        <main className="p-6">
            <div className="my-4 flex justify-between">
                <PageBreadcrumb
                    breadCrumbData={[
                        {
                            pageName: `${capitalizeFirstLetter(actorType)}`,
                            pageUrl: `/actors/${actorType}`,
                        },
                    ]}
                />
                <p className="text-lg font-medium">{capitalizeFirstLetter(actorType)}s</p>
                <Link className={clsx(buttonVariants({ variant: "default", size: "sm" }))} href={`/actors/${actorType}/create`}>
                    Create {title}
                </Link>
            </div>

            <Suspense fallback={<Loading />}>
                {/* <ActorsTable actorType={actorType} loadData={loadData} /> */}
                <ActorWrapper actorType={actorType} />
            </Suspense>
        </main>
    );
}
