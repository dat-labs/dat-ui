"use client";

import React, { Suspense } from "react";
import { getFormDataForSource, getActors, createActorInstance } from "./api";
import FormGenerator from "@/components/ClientComponents/FormGenerator/FormGenerator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
    BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function CreatePage({ params }: { params: { actorType: string } }) {
    const router = useRouter();

    const [actors, setActors] = React.useState<any>(null);
    const [selectedActor, setSelectedActor] = React.useState<any>(null);
    const [formData, setFormData] = React.useState<any>(null);

    const handleSubmit = async (data: any) => {
        let apiData = {
            workspace_id: "wkspc-uuid",
            actor_id: selectedActor,
            user_id: "09922bd9-7872-4664-99d0-08eae42fb554",
            name: data["dat-name"],
            actor_type: params.actorType,
            status: "active",
            configuration: data,
        };
        const res = await createActorInstance(apiData);
        toast(`${params.actorType} created successfully.`, {
            description: "New source created successfully",
        });
        router.push(`/actors/${params.actorType}`);
    };

    React.useEffect(() => {
        (async () => {
            if (selectedActor) {
                const res: any = await getFormDataForSource(selectedActor);
                setFormData(res);
            }
        })();
        return () => {
            setFormData(null);
        };
    }, [selectedActor]);

    React.useEffect(() => {
        (async () => {
            const res: any = await getActors(params.actorType);
            setActors(res);
        })();
    }, []);

    return (
        <div>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href={`/actors/${params.actorType}`}>{params.actorType}</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Create</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="flex justify-center">
                <div className="w-6/12">
                    <div className="mb-4">
                        <Select onValueChange={(val) => setSelectedActor(val)}>
                            <SelectTrigger>
                                <SelectValue placeholder={`Select a ${params.actorType}`} />
                            </SelectTrigger>
                            <SelectContent>
                                {actors?.map((actor: any) => (
                                    <SelectItem value={actor.id}>{actor.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    {formData?.properties?.connection_specification?.properties && (
                        <FormGenerator
                            properties={formData?.properties?.connection_specification?.properties}
                            onSubmit={handleSubmit}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
