import React, { useCallback, useEffect, useState } from "react";
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
import useApiCall from "@/hooks/useApiCall";
import { getSession } from "next-auth/react";
import Loading from "../../loading";
/**
 * Form structure for Creating/Editing an Actor
 * @param actorType - The type of the actor.
 * @param postFormSubmitActions - Actions to perform after form submission
 * @param editMode - Indicates if the form is in edit mode.
 * @param actorId - The ID of the actor to edit.
 * @returns Form Fields
 */
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
    // For form input values in both Edit and Create Mode
    const [formData, setFormData] = React.useState<any>(null);

    // ************************************************ Create Form Logic *****************************************************
    const [step, setStep] = useState(1);
    const [actors, setActors] = React.useState<any>(null);
    const [selectedActor, setSelectedActor] = React.useState<any>(null);
    const [error, setError] = React.useState<any>(null);

    const { makeApiCall: createInstanceApi } = useApiCall(createActorInstance, "POST");

    /**
     * Handles form submission for creating a new actor.
     * @param data - The form data.
     * @returns Form submission
     */
    const handleCreateFormSubmit = async (data: any) => {
        error && setError(null);

        const session = await getSession();

        let apiData = {
            workspace_id: session?.user?.workspace_id,
            actor_id: selectedActor,
            user_id: session?.user?.id,
            name: data["dat_name"],
            actor_type: actorType,
            status: "active",
            configuration: data,
        };

        const res = await createInstanceApi(apiData);
        console.log("res", res);
        if (res.status_code !== 200) {
            setError(res.responseData.detail);
        }
        if (res.status_code === 200 && postFormSubmitActions) {
            await postFormSubmitActions();
        }
    };

    /**
     * @ if creating actor then fetches data for selectedActors
     */
    const { data: formStructure, loading: formStructureLoader, makeApiCall: formStructurApi } = useApiCall(getFormDataForSource);
    useEffect(() => {
        !editMode &&
            (async () => {
                if (selectedActor) {
                    await formStructurApi(selectedActor);
                    setStep(2);
                }
            })();
        return () => {
            setFormData(null);
        };
    }, [selectedActor]);

    useEffect(() => {
        if (formStructure) {
            setFormData(formStructure);
        }
    }, [formStructure, setFormData]);

    /**
     * Fetches the list of actor options for the given actor type when not in edit mode.
     * @returns list of actor options
     */
    const { data: getActorsData, loading: getActorsLoader, makeApiCall: getActorsApi } = useApiCall(getActors, "GET");
    useEffect(() => {
        !editMode &&
            (async () => {
                await getActorsApi(actorType);
            })();
    }, []);

    useEffect(() => {
        if (getActorsData) {
            setActors(getActorsData);
            console.log(getActorsData);
        }
    }, [setActors, getActorsData]);

    /**
     * handles the state {selectedActor} and moves to step 2 of Actor creation
     * @param actorData - The selected actor's data in step 1
     */
    const actorHandler = (actorData: any) => {
        setSelectedActor(actorData?.id);
        setStep(2);
    };

    //************************************************* Edit Form Logic *****************************************
    const router = useRouter();

    const [actorInstanceData, setActorInstanceData] = useState(null);

    const { loading: actorDataLoader, makeApiCall: actorDataApi } = useApiCall(getActorData);
    const { loading: actorSpecResLoader, makeApiCall: actorSpecResApi } = useApiCall(getActorSpec);

    /**
     * Loads the saved actor's data and displays in it's Edit form
     * @returns Actor's saved data to be edited
     */
    const load = useCallback(async () => {
        const data = await actorDataApi(actorType, actorId);
        const jsonData = await actorSpecResApi(data?.actor.id);
        setActorInstanceData(data); // fill the form when Edit Mode
        setFormData(jsonData); // setting Form data when Edit executed
    }, [actorType, setActorInstanceData, setFormData]);

    /**
     * Calls the load function when in Edit Mode
     */
    React.useEffect(() => {
        editMode && load();
    }, []);

    const {
        data: updateInstanceRes,
        statusCode: updateInstanceStatus,
        makeApiCall: updateInstanceApi,
    } = useApiCall(updateActorInstance, "PUT");

    /**
     * Handles form submission for editing an existing actor.
     * @param data - The edited form data
     * @returns form submission after Editing
     */
    const handleEditFormSubmit = async (savedData: any) => {
        let apiData = {
            name: savedData["dat-name"],
            configuration: savedData,
        };

        await updateInstanceApi(actorId, apiData);
        console.log(updateInstanceRes);

        //TODO test status check

        if (updateInstanceStatus === 200) {
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
                        {/* Back button not needed in Edit Mode */}
                        {!editMode && (
                            <Button onClick={() => setStep(1)} variant="outline" className="mb-7">
                                <ArrowLeftIcon className="mr-4" /> Back
                            </Button>
                        )}

                        {formStructureLoader || actorDataLoader || actorSpecResLoader ? (
                            <div className="mr-8">
                                <Loading height="400px" />
                            </div>
                        ) : (
                            //Form generator to create Or edit as per editMode value
                            formData?.properties?.connection_specification?.properties && (
                                <>
                                    <p className="mb-2 font-bold">
                                        {editMode ? "Edit" : "Create"} a {capitalizeFirstLetter(actorType)}
                                    </p>
                                    <FormGenerator
                                        properties={formData?.properties?.connection_specification?.properties}
                                        onSubmit={editMode ? handleEditFormSubmit : handleCreateFormSubmit}
                                        submitButtonText={editMode ? "" : "Test and Save"}
                                        errorText={!editMode && error}
                                        defaultData={editMode && actorInstanceData?.configuration}
                                    />
                                </>
                            )
                        )}
                    </DocWrapper>
                )}
            </div>
        </div>
    );
}
