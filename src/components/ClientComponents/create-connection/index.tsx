"use client";

import React, { Suspense } from "react";
import SelectActor from "./select-actor";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const formDataValue = {
    step: 1,
    selectedSource: null,
    selectedGenerator: null,
    selectedDestination: null,
};

export const FromDataContext = React.createContext(null);

const FormContextProvider = ({ children }: { children: any }) => {
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
        component: <SelectActor />,
    },
];

const FormComponent = () => {
    const { state, updateState } = React.useContext(FromDataContext);

    const handleNext = () => {
        updateState("step", state.step + 1);
    };

    const handleBack = () => {
        updateState("step", state.step - 1);
    };

    return (
        <>
            <div className="mt-4">
                <div className="flex justify-center">
                    <div className="w-6/12">
                        <div className="flex justify-between">
                            {formSteps.map((step, index) => (
                                <div key={index} className="flex items-center">
                                    <div
                                        className={`w-6 h-6 rounded-full ${
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
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <Separator className="mt-4" />
                <Card className="mt-4 p-4">
                    <Suspense fallback={<h1>Loading...</h1>}>{formSteps[state.step - 1].component}</Suspense>

                    <div className="flex justify-center mt-4 gap-2">
                        <Button disabled={state.step === 1} size="sm" variant="outline" onClick={handleBack}>
                            Back
                        </Button>
                        <Button size="sm" onClick={handleNext}>
                            Next
                        </Button>
                    </div>
                </Card>
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
