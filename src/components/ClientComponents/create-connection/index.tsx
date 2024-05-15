"use client";

import React, { Suspense } from "react";
import SelectActor from "./select-actor";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import ConnectionConfiguration from "./connection-configuration";
import { addConnection } from "./api";

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

export const FormContextProvider = ({ children }: { children: any }) => {
    const [state, setState] = React.useState(formDataValue);

    const updateState = (key: any, value: any) => {
        setState({
            ...state,
            [key]: value,
        });
    };

    return <FromDataContext.Provider value={{ state, updateState }}>{children}</FromDataContext.Provider>;
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
        component: <ConnectionConfiguration />,
    },
];

const getStremsData = (streamsObj: any) => {
    let arrToReturn: any = [];
    Object.keys(streamsObj).forEach((streamName: string) => {
        if (streamsObj[streamName].configured === true) {
            arrToReturn.push({
                ...streamsObj[streamName].configuration,
                name: streamName,
                json_schema: {},
                read_sync_mode: "INCREMENTAL",
                write_sync_mode: "APPEND",
                cursor_field: "string",
            });
        }
    });
    return arrToReturn;
};

const FormComponent = () => {
    const { state, updateState } = React.useContext(FromDataContext);

    const handleNext = () => {
        updateState("step", state.step + 1);
    };

    const handleBack = () => {
        updateState("step", state.step - 1);
    };

    const handleSave = async () => {
        const postData = {
            source_instance_id: state.source.value.id,
            generator_instance_id: state.generator.value.id,
            destination_instance_id: state.destination.value.id,
            workspace_id: "wkspc-uuid",
            user_id: "09922bd9-7872-4664-99d0-08eae42fb554",
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
                    cron_expression: "5 * * * *",
                    timezone: "UTC",
                },
            },
            schedule_type: "manual",
        };
        console.log(postData);
        const res = await addConnection(postData);
        console.log(res);
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
            <div className="">
                <div className="flex mt-3">
                    <div className=" w-full">
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
                                            {index < state.step - 1 ? (
                                                <span className="text-sm font-bold">&#10003;</span>
                                            ) : (
                                                index + 1
                                            )}
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
                        <div className="flex justify-center mt-4 gap-2">
                            <Button disabled={state.step === 1} size="sm" variant="outline" onClick={handleBack}>
                                Back
                            </Button>
                            {state.step < 4 ? (
                                <Button size="sm" disabled={shouldDisableNextButton()} onClick={handleNext}>
                                    Next
                                </Button>
                            ) : (
                                <Button size="sm" onClick={handleSave}>
                                    Save
                                </Button>
                            )}
                        </div>
                    )}
                </div>
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
