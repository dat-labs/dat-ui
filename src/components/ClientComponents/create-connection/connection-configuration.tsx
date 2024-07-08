import React, { useEffect, useState } from "react";
import { FromDataContext } from ".";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Streams from "./streams";
import { getStreamsForSource } from "./api";
import useApiCall from "@/hooks/useApiCall";

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
];

/**
 * ConnectionConfiguration component manages the configuration of a connection.
 * It allows setting the connection's name, schedule, and streams data.
 * @returns {JSX.Element} The rendered ConnectionConfiguration component.
 */
export default function ConnectionConfiguration() {
    const { state, updateState } = React.useContext(FromDataContext);

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
    const handleNameChange = (e: any) => {
        updateState("configuration", { ...state.configuration, name: e.target.value });
    };

    /**
     * Handles changes to the schedule select component.
     * @param {any} val The selected value from the schedule select component.
     */
    const handleScheduleChange = (val: any) => {
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
    }, [state.source.value.id]);

    /**
     * Updates the streams object in the component's state with fetched data.
     */
    useEffect(() => {
        data?.properties.document_streams.items.anyOf.forEach((stream: any) => {
            streamsObj[stream.properties.name.default] = {
                streamProperties: stream,
                configuration: {},
                configured: false,
            };
        });
        updateState("streams", streamsObj);
    }, [data]);

    return (
        <>
            <div className="w-6/12">
                <label htmlFor="dat_name">Name</label>
                <Input
                    className="mt-2 mb-2"
                    name="dat_name"
                    id="dat_name"
                    value={state.configuration.name}
                    placeholder="Give a name to your connection"
                    type="text"
                    onChange={(e) => handleNameChange(e)}
                />
                <label className="mt-2" htmlFor="schedule">
                    Schedule
                </label>
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
            </div>
            <div className="mt-4">
                <Streams data={getStreamsData(state.streams)} loading={loading} />
            </div>
        </>
    );
}
