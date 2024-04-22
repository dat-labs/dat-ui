// "use server";

import { Suspense } from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "@/components/ui/breadcrumb";

import Loading from "../loading";
import ActorsTable from "../actors-table";
import { capitalizeFirstLetter } from "@/lib/utils";
import NotFound from "./not-found";


interface pageProps {
    params : {
        actorType: string;
    }
}

// Create an array of actors
const actors = [
    "source",
    "generator",
    "destination",
]

export default function ActorsPage({ params }: pageProps){
    const {actorType} = params;
    if (!actors.includes(actorType)) {
        return <NotFound />;
    }
    const title = capitalizeFirstLetter(actorType);

    return (
        <main>
            <div className="my-4">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                        <BreadcrumbLink href={`/actors/${actorType}`}>{title}</BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            {/* {table} */}
            <Suspense fallback={<Loading />}>
                <ActorsTable actorType={actorType}/>
            </Suspense>
        </main>
    );
}
