import React, { useCallback, useState } from "react";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import FormGenerator from "@/components/ClientComponents/FormGenerator/FormGenerator";
import { getFormDataForSource, getActors, createActorInstance } from "./api";
import ActorListing from "./actors-listing";
import DocWrapper from "@/components/commom/doc-wrapper";
import { Button } from "@/components/ui/button";
import { capitalizeFirstLetter, getIconComponent } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { getActorData, getActorSpec } from "../../api";
import { updateActorInstance } from "../[actorId]/api";
import { toast } from "sonner";

export default function ActorForm({
    actorType,
    postFormSubmitActions,
    editMode,
    actorId,
}: {
    actorType: any;
    postFormSubmitActions?: any;
    editMode?: boolean;
    actorId?: any;
}) {
    //  Create Form Logic
    const [step, setStep] = useState(1);
    const [actors, setActors] = React.useState<any>(null);
    const [selectedActor, setSelectedActor] = React.useState<any>(null);
    const [formData, setFormData] = React.useState<any>(null);
    const [error, setError] = React.useState<any>(null);

    const handleCreateFormSubmit = async (data: any) => {
        error && setError(null);

        let apiData = {
            workspace_id: "wkspc-uuid",
            actor_id: selectedActor,
            user_id: "09922bd9-7872-4664-99d0-08eae42fb554",
            name: data["dat_name"],
            actor_type: actorType,
            status: "active",
            configuration: data,
        };
        const res = await createActorInstance(apiData);
        console.log("res", res);
        if (res.status_code !== 200) {
            setError(res.responseData.detail);
        }
        if (res.status_code === 200 && postFormSubmitActions) {
            await postFormSubmitActions();
        }
    };
    React.useEffect(() => {
        !editMode &&
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
        !editMode &&
            (async () => {
                const res: any = await getActors(actorType);
                setActors(res);
            })();
    }, []);

    const actorHandler = (actorData: any) => {
        setSelectedActor(actorData?.id);
        setStep(2);
    };

    //Edit Form Logic
    const router = useRouter();

    const [actorInstanceData, setActorInstanceData] = useState(null);
    const [actorSpecData, setActorSpecData] = useState(null);

    const load = useCallback(async () => {
        const data = await getActorData(actorType, actorId);
        const jsonData = await getActorSpec(data.actor.id);
        setActorInstanceData(data);
        setActorSpecData(jsonData);
    }, [actorType, setActorInstanceData]);

    React.useEffect(() => {
        editMode && load();
    }, []);

    const handleEditFormSubmit = async (data: any) => {
        let apiData = {
            name: data["dat-name"],
            configuration: data,
        };
        const res = await updateActorInstance(actorId, apiData);
        //TODO test status check
        if (res.status === 200) {
            router.push(`/actors/${actorType}`);
            toast(`${actorType} updated successfully.`, {
                description: `${actorType} updated successfully.`,
            });
        } else {
            toast(`${actorType} update failed.`, {
                description: `${actorType} update failed.`,
            });
        }
    };

    return (
        <div className="flex p-5">
            <div className="w-full">
                {!editMode && step === 1 && (
                    <div className="mb-4">
                        <ActorListing
                            actors={actors}
                            onChangeHandler={actorHandler}
                            actorType={actorType}
                            selectedActor={selectedActor}
                        />
                    </div>
                )}
                {(editMode || step === 2) && (
                    <DocWrapper doc={`${editMode ? "Edit" : "Create"}  Page doc`} url="google.com" editMode={editMode}>
                        {!editMode && (
                            <Button onClick={() => setStep(1)} variant="outline" className="mb-7">
                                <ArrowLeftIcon className="mr-4" /> Back
                            </Button>
                        )}

                        <p className="mb-2 font-bold">
                            {editMode ? "Edit" : "Create"} a {capitalizeFirstLetter(actorType)}
                        </p>

                        {editMode
                            ? actorInstanceData !== null && (
                                  <FormGenerator
                                      properties={actorSpecData.properties.connection_specification.properties}
                                      onSubmit={handleEditFormSubmit}
                                      defaultData={actorInstanceData.configuration}
                                  />
                              )
                            : formData?.properties?.connection_specification?.properties && (
                                  <FormGenerator
                                      properties={formData?.properties?.connection_specification?.properties}
                                      onSubmit={handleCreateFormSubmit}
                                      submitButtonText="Test and Save"
                                      errorText={error}
                                  />
                              )}
                    </DocWrapper>
                )}
            </div>
        </div>
    );
}
