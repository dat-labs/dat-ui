import { capitalizeFirstLetter, importIcon } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import React, { useContext, useEffect, useState } from "react";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import clsx from "clsx";
import EditStreams from "./EditStreams";
import RunHistory from "./RunHistory";
import Scheduling from "./Scheduling";
import { FormContextProvider, FromDataContext } from "../create-connection";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import "./runLoader.css";
import useApiCall from "@/hooks/useApiCall";
import { manualRunConnection, updateConnection } from "@/app/connections/[connectionId]/api";
import { toast } from "sonner";
import CircularLoader from "@/components/ui/circularLoader";
import { WorkspaceDataContext } from "../workspace-provider";

const tabComponentMapper = {
    streams: EditStreams,
    run_history: RunHistory,
    scheduling: Scheduling,
};

const EditConnectionComponent = ({ connectionData }) => {
    const { state, updateState } = React.useContext(FromDataContext);
    const { curWorkspace } = useContext(WorkspaceDataContext);
    const [tab, setTab] = React.useState("streams");
    const handleStreamConfigrationSave = (values: any, streamName: string) => {
        if (Object.keys(state.streams[streamName].configuration).length === 0) {
            const objToUpdate = {
                ...state.streams,
                [streamName]: {
                    ...state.streams[streamName],
                    configuration: values,
                    configured: true,
                    streamProperties: state.streams[streamName].streamProperties,
                },
            };
            updateState("streams", objToUpdate);
        }
    };

    /**
     * useEffect to run after source is set
     */
    React.useEffect(() => {
        if (state.source.value !== null && Object.keys(state.streams).length > 0) {
            connectionData.catalog.document_streams.forEach((stream: any) => {
                handleStreamConfigrationSave(stream, stream.name);
            });
        }
    }, [state.source.value, state]);

    React.useEffect(() => {
        updateState("source", { ...state["source"], value: connectionData.source_instance });
    }, []);

    useEffect(() => {
        if (state.source.value) {
            updateState("generator", { ...state["generator"], value: connectionData.generator_instance });
        }
    }, [state.source.value]);

    useEffect(() => {
        if (state.generator.value) {
            updateState("destination", { ...state["destination"], value: connectionData.destination_instance });
        }
    }, [state.generator.value]);

    const router = useRouter();
    const OpenActor = (actorType: string, actor_id: string) => {
        router.push(`/actors/${actorType}/${actor_id}`);
    };

    const DestinationIcon = importIcon(connectionData.destination_instance.actor.icon);
    const GeneratorIcon = importIcon(connectionData.generator_instance.actor.icon);
    const SourceIcon = importIcon(connectionData.source_instance.actor.icon);
    const TabComponent = tabComponentMapper[tab];

    const { loading, makeApiCall: runConnectionCall } = useApiCall(manualRunConnection, "POST");
    const handleConnectionRun = async () => {
        const res = await runConnectionCall(connectionData.id, curWorkspace.id);
        if (res.status == 200) {
            toast.success("Run Initiated");
        } else {
            toast.error("Run Failed to Initiate!");
        }
    };

    const { loading: updateLoading, makeApiCall: updateConnectionStatus } = useApiCall(updateConnection, "PUT");

    const ToggleConnectionStatus = async () => {
        const curStatus = state.configuration.connectionStatus;
        const newStatus = curStatus === "active" ? "inactive" : "active";
        const updatedData = {
            ...connectionData, 
            status: newStatus,  // Updated status
        };

        const res = await updateConnectionStatus(connectionData.id, updatedData, curWorkspace.id);
    
        if (res.status === 200) {
            toast.success("Connection status updated successfully!");
            
            updateState("configuration", {
                ...state.configuration,
                connectionStatus: newStatus,
            });
        } else {
            toast.error("Failed to update connection status");
        }
    };

    // const ToggleConnectionStatus = () => {
    //     const curStatus = state.configuration.connectionStatus;
    //     updateState("configuration", {
    //         ...state.configuration,
    //         connectionStatus: curStatus === "active" ? "inactive" : "active",
    //     });
    // };

    return (
        <div>
            <div className="ml-6 mr-4 lg:mr-[85px] mt-2">
                <div className="flex flex-row justify-between">
                    <div className="flex flex-col">
                        <p className="text-xl font-bold text-foreground capitalize">{connectionData.name}</p>
                        <div className="flex mt-3 mb-3 gap-4">
                            <Card
                                className="flex items-center p-1 cursor-pointer bg-white"
                                onClick={() => OpenActor("source", connectionData.source_instance.id)}
                            >
                                {SourceIcon ? (
                                    <SourceIcon className="h-6 w-6" />
                                ) : (
                                    <img
                                        src={`https://ui-avatars.com/api/?name=${connectionData.source_instance.actor.name}`}
                                        alt="icon"
                                        className="h-7 w-7 rounded-md"
                                    />
                                )}
                            </Card>
                            <div className="flex items-center">
                                <ArrowRightIcon />
                            </div>
                            <Card
                                className="flex items-center p-1 cursor-pointer bg-white"
                                onClick={() => OpenActor("generator", connectionData.generator_instance.id)}
                            >
                                {GeneratorIcon ? (
                                    <GeneratorIcon className="h-6 w-6" />
                                ) : (
                                    <img
                                        src={`https://ui-avatars.com/api/?name=${connectionData.generator_instance.actor.name}`}
                                        alt="icon"
                                        className="h-7 w-7 rounded-md"
                                    />
                                )}
                            </Card>
                            <div className="flex items-center">
                                <ArrowRightIcon />
                            </div>
                            <Card
                                className="flex items-center p-1 cursor-pointer bg-white"
                                onClick={() => OpenActor("destination", connectionData.destination_instance.id)}
                            >
                                {DestinationIcon ? (
                                    <DestinationIcon className="h-6 w-6" />
                                ) : (
                                    <img
                                        src={`https://ui-avatars.com/api/?name=${connectionData.destination_instance.actor.name}`}
                                        alt="icon"
                                        className="h-7 w-7 rounded-md"
                                    />
                                )}
                            </Card>
                            <p className="my-auto text-muted-foreground font-light">Click to view actor details</p>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <Switch
                            id="schedule"
                            onClick={ToggleConnectionStatus}
                            checked={state.configuration.connectionStatus === "active"}
                        />
                        <p className="ml-2 w-[60px] text-center">{capitalizeFirstLetter(state.configuration.connectionStatus)}</p>
                        <Button className="my-auto ml-6" onClick={handleConnectionRun}>
                            Run Now
                        </Button>
                        <span className="size-4 ml-6">{state.configuration.status === "RUNNING" && <CircularLoader />}</span>
                    </div>
                </div>
            </div>
            <Separator />
            <div className="flex p-2 bg-muted">
                <div
                    className={clsx("w-6/12 flex justify-center cursor-pointer p-2 rounded-md", {
                        "bg-background": tab === "streams",
                    })}
                    onClick={() => setTab("streams")}
                >
                    <p>Streams</p>
                </div>
                <div
                    className={clsx("w-6/12 flex justify-center cursor-pointer p-2 rounded-md", {
                        "bg-background": tab === "run_history",
                    })}
                    onClick={() => setTab("run_history")}
                >
                    <p>Run History</p>
                </div>
            </div>
            {state.source.value && (
                <div className="p-4">
                    <TabComponent connectionData={connectionData} />
                </div>
            )}
        </div>
    );
};
export default function EditConnection({ connectionData }) {
    return (
        <FormContextProvider>
            <EditConnectionComponent connectionData={connectionData} />
        </FormContextProvider>
    );
}
