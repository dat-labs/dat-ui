import React, { useContext, useEffect, useState } from "react";
import { FromDataContext } from ".";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Streams from "./streams";
import { getStreamsForSource } from "./api";
import useApiCall from "@/hooks/useApiCall";
import Loading from "@/app/connections/[connectionId]/loading";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import cron from "cron-validate";

const scheduleOptions = [
    {
        title: "No Schedule",
    },
    {
        title: "Every 1 hour",
    },
    {
        title: "Every 2 hour",
    },
    {
        title: "Every 4 hour",
    },
    {
        title: "Every 8 hour",
    },
    {
        title: "Every 12 hour",
    },
    {
        title: "Every 24 hour",
    },
    {
        title: "Advanced Scheduling",
    },
];

/**
 * ConnectionConfiguration component manages the configuration of a connection.
 * It allows setting the connection's name, schedule, and streams data.
 * @returns {JSX.Element} The rendered ConnectionConfiguration component.
 */
export default function ConnectionConfiguration({ editMode }: { editMode: boolean }) {
    const { state, updateState } = useContext(FromDataContext);
    const [refresh, setRefresh] = useState(false);
    const [connectionName, setConnectionName] = useState(state.configuration.name);
    const [cronSchedule, setCronSchedule] = useState(state.configuration.cronSchedule);
    const [cronError, setCronError] = useState("");

    /**
     * Retrieves streams data from the state and formats it for rendering.
     *
     * @param {object} streams The streams object from the component's state.
     * @returns {Array<object>} An array of formatted stream data objects.
     */
    const getStreamsData = (streams: any) => {
        const data: any = [];
        Object.keys(state.streams).forEach((stream) => {
            data.push({
                name: stream,
                streamProperties: streams[stream].streamProperties,
                configuration: streams[stream].configuration,
                configured: streams[stream].configured,
            });
        });
        return data;
    };

    /**
     * Handles changes to the connection name input field.
     */
    const handleNameChange = (e) => {
        setConnectionName(e.target.value);
        updateState("configuration", { ...state.configuration, name: e.target.value });
    };
    const handleCronScheduleChange = (e) => {
        setCronSchedule(e.target.value);
        updateState("configuration", { ...state.configuration, cronSchedule: e.target.value });

        const exp = cron(e.target.value);
        if (exp.isValid()) {
            setCronError("");
        } else {
            setCronError("Invalid Cron Schedule");
        }
    };

    /**
     * Handles changes to the schedule select component.
     * @param {any} val The selected value from the schedule select component.
     */
    const handleScheduleChange = (val) => {
        updateState("configuration", { ...state.configuration, schedule: val });
    };

    const { data, loading, makeApiCall } = useApiCall(getStreamsForSource);
    const streamsObj: any = {};

    useEffect(() => {
        /**
         * Fetches streams data from the API based on the selected source.
         */
        const fetchStreams = async () => {
            await makeApiCall(state.source.value.id);
        };

        fetchStreams();
    }, [state.source.value.id, refresh]);

    /**
     * Updates the streams object in the component's state with fetched data.
     */
    useEffect(() => {
        if (data) {
            data?.properties.document_streams.items.anyOf.forEach((stream: any) => {
                streamsObj[stream.properties.name.default] = {
                    streamProperties: stream,
                    configuration: {},
                    configured: false,
                };
            });
            updateState("streams", streamsObj);
        }
    }, [data]);

    /** Hook to set default Connection Name */
    useEffect(() => {
        if (editMode && state.configuration.name) {
            setConnectionName(state.configuration.name);
            setCronSchedule(state.configuration.cronSchedule);
        } else if (!editMode && !state.configuration.name) {
            const getActorName = (actorType) => {
                return state[actorType]?.value?.name || actorType;
            };
            const dummyName = `${getActorName("source")} -> ${getActorName("generator")} -> ${getActorName("destination")}`;
            setConnectionName(dummyName);
            updateState("configuration", { ...state.configuration, name: dummyName });
        }
    }, [state.streams]);

    return (
        <>
            <div className="w-6/12">
                <Card className="p-4">
                    <Label className="ml-1" htmlFor="dat_name">
                        Name
                    </Label>
                    <Input
                        className="my-2"
                        name="dat_name"
                        id="dat_name"
                        value={connectionName}
                        placeholder="Give a name to your connection"
                        type="text"
                        onChange={handleNameChange}
                    />
                    <Label className="ml-1 mt-2" htmlFor="schedule">
                        Schedule
                    </Label>
                    <Select onValueChange={(val) => handleScheduleChange(val)} value={state.configuration.schedule}>
                        <SelectTrigger className="mt-2" id="schedule">
                            <SelectValue placeholder="Select a schedule" />
                        </SelectTrigger>
                        <SelectContent>
                            {scheduleOptions.map((option: any, index: number) => (
                                <>
                                    <SelectItem key={index} value={option.title}>
                                        {option.title}
                                    </SelectItem>
                                </>
                            ))}
                        </SelectContent>
                    </Select>

                    <div
                        className={`${
                            state.configuration.schedule === "Advanced Scheduling" ? "block" : "hidden"
                        } xl:w-1/2 ml-1 mt-2`}
                    >
                        <Label htmlFor="cron_schedule">Cron Schedule</Label>
                        <Input
                            id="cron_schedule"
                            name="cron_schedule"
                            type="text"
                            placeholder="Enter Cron Schedule Expression"
                            value={cronSchedule}
                            onChange={handleCronScheduleChange}
                            className="mt-1"
                        />
                        {cronError.length > 0 && <div className="text-red-600 ml-1">{cronError}</div>}
                    </div>
                </Card>
            </div>
            <div className="my-4">
                <Card>
                    <CardHeader className="flex flex-row justify-between">
                        <div className="space-y-2">
                            <CardTitle className="text-xl">Configure your streams</CardTitle>
                            <CardDescription>Select atleast 1 stream to continue</CardDescription>
                        </div>
                        <div>
                            <Button className="my-auto" onClick={() => setRefresh(!refresh)}>
                                Refresh Streams
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>{loading ? <Loading /> : <Streams data={getStreamsData(state.streams)} />}</CardContent>
                </Card>
            </div>
        </>
    );
}
