"use client";

import React, { Suspense } from "react";
import { getFormDataForSource, getActors, createActorInstance } from "./api";
import FormGenerator from "@/components/ClientComponents/FormGenerator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup, SelectLabel } from "@/components/ui/select";

export default function CreatePage({ params }: { params: { actorType: string } }) {
    const [actors, setActors] = React.useState<any>(null);
    const [selectedActor, setSelectedActor] = React.useState<any>(null);
    const [formData, setFormData] = React.useState<any>(null);

    const handleSubmit = async (data: any) => {
        const res = await 
    }

    React.useEffect(() => {
        (async () => {
            if (selectedActor) {
                const res: any = await getFormDataForSource(selectedActor);
                console.log(res);
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
            <div className="flex justify-center">
                <div className="w-6/12">
                    <Select onValueChange={(val) => setSelectedActor(val)}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select a fruit" />
                        </SelectTrigger>
                        <SelectContent>
                            {actors?.map((actor: any) => (
                                <SelectItem value={actor.id}>{actor.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Suspense fallback={<div>Loading...</div>}>
                        {formData?.properties?.connection_specification?.properties && (
                            <FormGenerator properties={formData?.properties?.connection_specification?.properties} onSubmit={handleSubmit} />
                        )}
                    </Suspense>
                </div>
            </div>
        </div>
    );
}
