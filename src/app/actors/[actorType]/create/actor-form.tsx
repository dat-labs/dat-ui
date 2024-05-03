import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import FormGenerator from "@/components/ClientComponents/FormGenerator/FormGenerator";
import { getFormDataForSource, getActors, createActorInstance } from "./api";

export default function ActorForm({ actorType, postFormSubmitActions }: { actorType: any; postFormSubmitActions: any }) {
    const [actors, setActors] = React.useState<any>(null);
    const [selectedActor, setSelectedActor] = React.useState<any>(null);
    const [formData, setFormData] = React.useState<any>(null);

    const handleSubmit = async (data: any) => {
        let apiData = {
            workspace_id: "wkspc-uuid",
            actor_id: selectedActor,
            user_id: "09922bd9-7872-4664-99d0-08eae42fb554",
            name: data["dat-name"],
            actor_type: actorType,
            status: "active",
            configuration: data,
        };
        const res = await createActorInstance(apiData);
        console.log(res);
        if (postFormSubmitActions) {
            await postFormSubmitActions();
        }
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
            const res: any = await getActors(actorType);
            setActors(res);
        })();
    }, []);

    return (
        <>
            <div className="mb-4">
                <Select onValueChange={(val) => setSelectedActor(val)}>
                    <SelectTrigger>
                        <SelectValue placeholder={`Select a ${actorType}`} />
                    </SelectTrigger>
                    <SelectContent>
                        {actors?.map((actor: any) => (
                            <SelectItem value={actor.id}>{actor.name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            {formData?.properties?.connection_specification?.properties && (
                <FormGenerator properties={formData?.properties?.connection_specification?.properties} onSubmit={handleSubmit} />
            )}
        </>
    );
}
