import React from "react";
import { FromDataContext } from ".";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Streams from "./streams";
import { getStreamsForSource } from "./api";

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

export default function ConnectionConfiguration() {
    const { state, updateState } = React.useContext(FromDataContext);
    console.log(state.configuration);

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

    const handleNameChange = (e: any) => {
        updateState("configuration", { ...state.configuration, name: e.target.value });
    };

    const hadnleScheduleChange = (val: any) => {
        updateState("configuration", { ...state.configuration, schedule: val });
    };

    React.useEffect(() => {
        const fetchStreams = async () => {
            const res = await getStreamsForSource(state.source.value.id);
            const streamsObj: any = {};
            res.properties.streams.items.forEach((stream: any) => {
                streamsObj[stream.properties.name.default] = {
                    streamProperties: stream,
                    configuration: {},
                    configured: false,
                };
            });
            updateState("streams", streamsObj);
        };
        fetchStreams();
    }, [state.source.value.id]);

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
                <Select onValueChange={(val) => hadnleScheduleChange(val)} value={state.configuration.schedule}>
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
                <Streams data={getStreamsData(state.streams)} />
            </div>
        </>
    );
}
