import { Suspense } from "react";
import Loading from "./loading";
import SourcesTable from "./sources-table";
import { buttonVariants } from "@/components/ui/button";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "@/components/ui/breadcrumb";
import Link from "next/link";

export default async function Home() {
    return (
        <main>
            <div className="my-4">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/sources">Sources</BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <div className="flex justify-between mb-4">
                <h1>List of sources:</h1>
                <Link className={buttonVariants({ variant: "outline" })} href="/sources/add">
                    Add a source
                </Link>
            </div>
            <Suspense fallback={<Loading />}>
                <SourcesTable />
            </Suspense>
        </main>
    );
}
