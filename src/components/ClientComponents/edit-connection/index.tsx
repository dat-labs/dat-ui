import { importIcon } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import clsx from "clsx";
import EditStreams from "./EditStreams";
import RunHistory from "./RunHistory";
import Scheduling from "./Scheduling";
import { FormContextProvider, FromDataContext } from "../create-connection";

const tabComponentMapper = {
    streams: EditStreams,
    run_history: RunHistory,
    scheduling: Scheduling,
};

const EditConnectionComponent = ({ connectionData }) => {
    const { state, updateState } = React.useContext(FromDataContext);
    const [tab, setTab] = React.useState("streams");
    console.log(state);
    const handleStreamConfigrationSave = (values: any, streamName: string) => {
        console.log(Object.keys(state.streams[streamName].configuration).length);
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
            console.log(objToUpdate);
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
        console.log(state);
    }, []);

    const DestinationIcon = importIcon(connectionData.destination_instance.actor.icon);
    const SourceIcon = importIcon(connectionData.source_instance.actor.icon);
    const TabComponent = tabComponentMapper[tab];
    return (
        <div>
            <div className="ml-6 mt-2">
                <p className="text-xl font-bold text-foreground">{connectionData.name}</p>
                <div className="flex mt-3 mb-3 gap-4">
                    <div className="flex items-center">
                        <SourceIcon />
                        <p className="ml-3">{connectionData.source_instance.actor.name}</p>
                    </div>
                    <div className="flex items-center">
                        <ArrowRightIcon />
                    </div>
                    <div className="flex items-center">
                        {DestinationIcon ? (
                            <DestinationIcon />
                        ) : (
                            <img
                                src={`https://ui-avatars.com/api/?name=${connectionData.destination_instance.actor.name}`}
                                alt="icon"
                                className="h-7 w-7 rounded-md"
                            />
                        )}
                        <p className="ml-3">{connectionData.destination_instance.actor.name}</p>
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
