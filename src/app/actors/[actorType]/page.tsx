import { Suspense } from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "@/components/ui/breadcrumb";

import Loading from "../loading";
import ActorsTable from "../actors-table";
import { capitalizeFirstLetter } from "@/lib/utils";


interface pageProps {
    params : {
        actorType: string;
    }
}

export default function ActorsPage({ params }: pageProps){
    const {actorType} = params;
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
