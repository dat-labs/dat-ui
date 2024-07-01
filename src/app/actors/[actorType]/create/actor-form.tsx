import React, { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon, ChevronLeftIcon } from "@radix-ui/react-icons";
import FormGenerator from "@/components/ClientComponents/FormGenerator/FormGenerator";
import { getFormDataForSource, getActors, createActorInstance } from "./api";
import ActorListing from "./actors-listing";
import DocWrapper from "@/components/commom/doc-wrapper";
import { Button } from "@/components/ui/button";
import { capitalizeFirstLetter, importIcon } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { getActorData, getActorSpec } from "../../api";
import { updateActorInstance } from "../[actorId]/api";
import { toast } from "sonner";
import useApiCall from "@/hooks/useApiCall";
import { getSession } from "next-auth/react";
import Loading from "../../loading";
import CircularLoader from "@/components/ui/circularLoader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";

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
    const ifDocs = true;

    // For form input values in both Edit and Create Mode
    const [formData, setFormData] = useState(null);

    // ************************************************ Create Form Logic *****************************************************
    const [step, setStep] = useState(1);
    const [actors, setActors] = useState(null);
    const [selectedActor, setSelectedActor] = useState(null);
    const [error, setError] = useState(null);
    const [actorInstanceIcon, setActorInstanceIcon] = useState(null);
    const [actorInstanceName, setActorInstanceName] = useState(null);

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
        if (!editMode && selectedActor) {
            (async () => {
                await formStructurApi(selectedActor);
                setStep(2);
            })();
        }
        return () => {
            setFormData(null);
        };
    }, [selectedActor]);

    useEffect(() => {
        if (formStructure) {
            setFormData(formStructure);
            setActorInstanceName(formStructure?.title?.replace("Specification", ""));
        }
    }, [formStructure, setFormData]);

    /**
     * Fetches the list of actor options for the given actor type when not in edit mode.
     * @returns list of actor options
     */
    const { data: getActorsData, loading: getActorsLoader, makeApiCall: getActorsApi } = useApiCall(getActors, "GET");
    useEffect(() => {
        if (!editMode) {
            (async () => {
                await getActorsApi(actorType);
            })();
        }
    }, []);

    useEffect(() => {
        if (getActorsData) {
            setActors(getActorsData);
        }
    }, [setActors, getActorsData]);

    useEffect(() => {
        if (!editMode && actors && actorInstanceName) {
            const reqActor = actors?.find((a) => a.name === actorInstanceName);
            if (reqActor) {
                setActorInstanceIcon(reqActor.icon);
            }
        }
    }, [actors, actorInstanceName]);

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
        setActorInstanceData(data);
        setFormData(jsonData);
    }, [actorType, actorId]);

    /**
     * Calls the load function when in Edit Mode
     */
    useEffect(() => {
        if (editMode) {
            load();
        }
    }, [editMode, load]);

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

    const ActorIcon = importIcon(editMode ? actorInstanceData?.actor?.icon : actorInstanceIcon);

    return (
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
                <ResizablePanelGroup direction="horizontal" className="min-h-[200px] w-full h-full">
                    <ResizablePanel defaultSize={ifDocs ? 50 : 100} minSize={30} className="h-full">
                        <div className={`flex flex-col h-full`}>
                            <div className="flex flex-row items-center border-b py-3 pl-4 space-x-2">
                                {ActorIcon !== null ? <ActorIcon className="h-6 w-6 stroke-foreground" /> : <CircularLoader />}
                                <p className="text-gray-600">{editMode ? actorInstanceData?.actor.name : actorInstanceName}</p>
                            </div>
                            <ScrollArea className={`w-full h-[610px]`}>
                                {formStructureLoader || actorDataLoader || actorSpecResLoader ? (
                                    <div className="w-11/12 mx-auto mt-4">
                                        <Loading />
                                    </div>
                                ) : (
                                    formData?.properties?.connection_specification?.properties && (
                                        <div className="w-11/12 mx-auto">
                                            {!editMode && (
                                                <Button
                                                    onClick={() => setStep(1)}
                                                    variant="ghost"
                                                    className="mt-4 p-0 font-semibold text-md"
                                                >
                                                    <ChevronLeftIcon className="mr-2" width={20} height={20} /> Back
                                                </Button>
                                            )}
                                            <Card className="my-4">
                                                <CardHeader>
                                                    <CardTitle className="text-lg font-bold">
                                                        {editMode ? "Edit" : "Create"} a {capitalizeFirstLetter(actorType)}
                                                    </CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                    <FormGenerator
                                                        properties={formData?.properties?.connection_specification?.properties}
                                                        onSubmit={editMode ? handleEditFormSubmit : handleCreateFormSubmit}
                                                        submitButtonText={editMode ? "" : "Test and Save"}
                                                        errorText={!editMode && error}
                                                        defaultData={editMode && actorInstanceData?.configuration}
                                                    />
                                                </CardContent>
                                            </Card>
                                        </div>
                                    )
                                )}
                            </ScrollArea>
                        </div>
                    </ResizablePanel>
                    {ifDocs && <ResizableHandle withHandle />}

                    {ifDocs && (
                        <ResizablePanel defaultSize={50} minSize={30} className="h-full">
                            <ScrollArea className={`w-full h-[660px]`}>
                                <DocWrapper doc={`${editMode ? "Edit" : "Create"} Page doc`} url="google.com" editMode={editMode}>
                                    {!editMode && (
                                        <Button onClick={() => setStep(1)} variant="outline" className="mb-7">
                                            <ArrowLeftIcon className="mr-4" /> Back
                                        </Button>
                                    )}
                                </DocWrapper>
                            </ScrollArea>
                        </ResizablePanel>
                    )}
                </ResizablePanelGroup>
            )}
        </div>
    );
}
