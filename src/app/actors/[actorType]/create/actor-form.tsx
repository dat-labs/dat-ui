import React, { useState } from "react";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import FormGenerator from "@/components/ClientComponents/FormGenerator/FormGenerator";
import { getFormDataForSource, getActors, createActorInstance } from "./api";
import ActorListing from "./actors-listing";
import DocWrapper from "@/components/commom/doc-wrapper";
import { Button } from "@/components/ui/button";
import { capitalizeFirstLetter, getIconComponent } from "@/lib/utils";

export default function ActorForm({ actorType, postFormSubmitActions }: { actorType: any; postFormSubmitActions: any }) {
    const [step, setStep] = useState(1);
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
        await console.log("res", res);
        if (postFormSubmitActions) {
            await postFormSubmitActions();
        }
    };

    React.useEffect(() => {
        (async () => {
            if (selectedActor) {
                const res: any = await getFormDataForSource(selectedActor);
                setFormData(res);
                setStep(2);
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

    const actorHandler = (actorData: any) => {
        setSelectedActor(actorData?.id);
        setStep(2);
    };

    return (
        <div className="flex p-5">
            <div className="w-full">
                {step === 1 && (
                    <div className="mb-4">
                        <ActorListing
                            actors={actors}
                            onChangeHandler={actorHandler}
                            actorType={actorType}
                            selectedActor={selectedActor}
                        />
                    </div>
                )}
                {step === 2 && (
                    <DocWrapper doc="Create Page doc" url="google.com">
                        <Button onClick={() => setStep(1)} variant="outline" className="mb-7">
                            <ArrowLeftIcon className="mr-4" /> Back
                        </Button>
                        <p className="mb-2 font-bold">Create a {capitalizeFirstLetter(actorType)}</p>
                        {formData?.properties?.connection_specification?.properties && (
                            <FormGenerator
                                properties={formData?.properties?.connection_specification?.properties}
                                onSubmit={handleSubmit}
                            />
                        )}
                    </DocWrapper>
                )}
            </div>
        </div>
    );
}
