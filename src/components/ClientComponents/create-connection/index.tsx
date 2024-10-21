"use client";

import React, { Suspense, useState } from "react";
import SelectActor from "./select-actor";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import ConnectionConfiguration from "./connection-configuration";
import { addConnection, checkActor } from "./api";
import useApiCall from "@/hooks/useApiCall";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";
import { toast } from "sonner";
import { getCronString } from "@/lib/utils";
import useCheckConnection from "@/hooks/checkConnectionError";
import CircularLoader from "@/components/ui/circularLoader";

const formDataValue = {
    step: 1,
    source: {
        subStep: "selectConfigured",
        value: null,
    },
    generator: {
        subStep: "selectConfigured",
        value: null,
    },
    destination: {
        subStep: "selectConfigured",
        value: null,
    },
    configuration: {
        name: null,
        schedule: null,
    },
    streams: {},
    showNavButtons: true,
};

export const FromDataContext = React.createContext(null);

/**
 * FormContextProvider manages the state for the form data and provides updateState function to update the state.
 * It wraps its children components with FromDataContext.Provider to make state and updateState accessible.
 * @param {React.ReactNode} children The child components to be wrapped by FormContextProvider.
 * @returns {JSX.Element} The rendered FormContextProvider component.
 */
export const FormContextProvider = ({ children }: { children: any }) => {
    const [state, setState] = React.useState(formDataValue);

    /**
     * Updates the state with the given key-value pair.
     * @param {any} key The key in the state object to update.
     * @param {any} value The new value to set for the key in the state object.
     */
    const updateState = (key: any, value: any) => {
        setState({
            ...state,
            [key]: value,
        });
    };

    const updateCombinedState = (actorType: string, actor: any) => {
        setState((prevState) => ({
            ...prevState,
            [actorType]: {
                ...prevState[actorType],
                value: actor,
            },
            step: prevState.step + 1,
        }));
    };

    return <FromDataContext.Provider value={{ state, updateState, updateCombinedState }}>{children}</FromDataContext.Provider>;
};

const formSteps = [
    {
        title: "Select Source",
        component: <SelectActor actorType="source" />,
    },
    {
        title: "Select Generator",
        component: <SelectActor actorType="generator" />,
    },
    {
        title: "Select Destination",
        component: <SelectActor actorType="destination" />,
    },
    {
        title: "Configure Connection",
        component: <ConnectionConfiguration editMode={false} />,
    },
];

/**
 * Retrieves the streams data from the streamsObj for rendering.
 *
 * @param {object} streamsObj The streams object from the component's state.
 * @returns {Array<object>} An array of formatted stream data objects.
 */
export const getStremsData = (streamsObj: any) => {
    let arrToReturn: any = [];
    Object.keys(streamsObj).forEach((streamName: string) => {
        if (streamsObj[streamName].configured === true) {
            arrToReturn.push({
                ...streamsObj[streamName].configuration,
                name: streamName,
                read_sync_mode: streamsObj[streamName].configuration.read_sync_mode,
                write_sync_mode: streamsObj[streamName].configuration.write_sync_mode,
            });
        }
    });
    return arrToReturn;
};

const FormComponent = () => {
    const { state, updateState } = React.useContext(FromDataContext);
    const { saveError, checkConnectionForError } = useCheckConnection(state);
    const checkActorApiCall = useApiCall(checkActor, "GET"); 
    const [loading, setLoading] = useState(false); 

    const handleNext = async () => {
        const actor = state[state.step === 1 ? "source" : state.step === 2 ? "generator" : "destination"].value;
        const session = await getSession();
        setLoading(true); // Start loading
    try {
        const response = await checkActor(actor.id, session.user.workspace_id);
        if (response.ok) {
            updateState("step", state.step + 1);
        } else {
            toast.error("Error - " + response.statusText);
        }
    } catch (error) {
        toast.error("Error validating the actor.");
    } finally {
        setLoading(false); // Stop loading
    }
    };

    const handleBack = () => {
        updateState("step", state.step - 1);
    };

    const router = useRouter();
    const { makeApiCall } = useApiCall(addConnection, "POST");

    /**
     * Handles the action when the "Save" button is clicked to save the connection configuration.
     * Makes an API call with the configured connection data.
     */
    const handleSave = async () => {
        if (!checkConnectionForError()) {
            const session = await getSession();
            let scheduleText, cronExpression;

            if (state.configuration.schedule === "Advanced Scheduling") {
                scheduleText = "Advanced Scheduling";
                cronExpression = state.configuration.cronSchedule;
            } else {
                scheduleText = null;
                cronExpression =
                    state.configuration.schedule === "No Schedule" ? "" : getCronString(state.configuration.schedule);
            }

            const postData = {
                source_instance_id: state.source.value.id,
                generator_instance_id: state.generator.value.id,
                destination_instance_id: state.destination.value.id,
                source_instance: state.source.value,
                generator_instance: state.generator.value,
                destination_instance: state.destination.value,
                workspace_id: session?.user?.workspace_id,
                user_id: session?.user?.id,
                name: state.configuration.name,
                namespace_format: "",
                prefix: "",
                configuration: {},
                status: "active",
                catalog: {
                    document_streams: getStremsData(state.streams),
                },
                schedule: {
                    cron: {
                        advanced_scheduling: scheduleText,
                        cron_expression: cronExpression,
                        timezone: "UTC",
                    },
                },
                schedule_type: "manual",
            };
            const res = await makeApiCall(postData, session.user.workspace_id);

            if (res.status === 200) {
                toast.success("Added Connection Successfully !!!");
                router.push("/connections");
            } else {
                toast.error("Failed to add Connection !");
            }
        }
    };

    const shouldDisableNextButton = () => {
        if (state.step === 1 && state.source.value === null) {
            return true;
        }
        if (state.step === 2 && state.generator.value === null) {
            return true;
        }
        if (state.step === 3 && state.destination.value === null) {
            return true;
        }
        return false;
    };

    return (
        <>
            <div className="flex mt-3">
                <div className="w-full">
                    <div className="flex justify-start gap-5">
                        {formSteps.map((step, index) => (
                            <>
                                <div key={index} className="flex items-center ml-2">
                                    <div
                                        className={`w-5 h-5 rounded-full ${
                                            index === state.step - 1
                                                ? "bg-primary text-primary-foreground"
                                                : index < state.step - 1
                                                ? "dark:bg-green-500 bg-green-400"
                                                : "bg-gray-300 "
                                        } flex items-center justify-center`}
                                    >
                                        {index < state.step - 1 ? <span className="text-sm font-bold">&#10003;</span> : index + 1}
                                    </div>
                                    <span className="ml-2 text-sm">{step.title}</span>
                                    <img
                                        width="15"
                                        height="10px"
                                        alt="seperator icon"
                                        className="h-3 w-3 ml-4"
                                        src="https://cdn0.iconfinder.com/data/icons/mintab-outline-for-ios-4/30/toward-forward-more-than-angle-bracket-512.png"
                                    />
                                </div>
                            </>
                        ))}
                    </div>
                    <Separator className="mt-3" />
                </div>
            </div>
            <div className="p-6">
                <div>{formSteps[state.step - 1].component}</div>

                {state.showNavButtons && (
                    <div className="flex flex-col ">
                        <div className="flex justify-center mt-4 gap-2">
                            <Button disabled={state.step === 1} size="sm" variant="outline" onClick={handleBack}>
                                Back
                            </Button>
                            {state.step < 4 ? (
                         <Button 
                         size="sm" 
                         disabled={shouldDisableNextButton() || loading} 
                         onClick={handleNext} 
                           >
                         {loading ?<CircularLoader /> : 'Next'}
                     </Button>                      
                            ) : (
                                <Button size="sm" onClick={handleSave}>
                                    Submit
                                </Button>
                            )}
                        </div>

                        {saveError && <p className="text-red-600 text-center mt-2">{saveError}</p>}
                    </div>
                )}
            </div>
        </>
    );
};

export default function CreateConnectionsForm() {
    return (
        <FormContextProvider>
            <FormComponent />
        </FormContextProvider>
    );
}