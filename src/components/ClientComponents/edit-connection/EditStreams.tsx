import React, { useState } from "react";
import ConnectionConfiguration from "../create-connection/connection-configuration";
import { FromDataContext, getStremsData } from "../create-connection";
import { Button } from "@/components/ui/button";
import { updateConnection } from "@/app/connections/[connectionId]/api";
import useApiCall from "@/hooks/useApiCall";
import CircularLoader from "@/components/ui/circularLoader";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";

export default function EditStreams({ connectionData }) {
    const router = useRouter();
    const { state, updateState } = React.useContext(FromDataContext);
    const [saveError, setSaveError] = useState("");

    console.log(connectionData);

    const getCronString = (schedule: string) => {
        const match = schedule.match(/\d+/);
        const n = match ? parseInt(match[0], 10) : null;

        const minute = Math.floor(Math.random() * 60);
        const cronString = `${minute} */${n} * * *`;

        return cronString;
    };
    const getScheduleString = (cronString: string) => {
        const match = cronString.match(/\*\/(\d+)/);
        const n = match ? parseInt(match[1], 10) : null;

        let scheduleString = `Every ${n} hour`;

        return scheduleString;
    };

    const checkConnectionForError = () => {
        let flag = false;
        for (let key in state.streams) {
            if (state.streams.hasOwnProperty(key) && state.streams[key].configured == true) {
                flag = true;
                break;
            }
        }

        let stream_name = "";
        for (let key in state.streams) {
            if (state.streams.hasOwnProperty(key)) {
                if (
                    state.streams[key].configured &&
                    (Object.keys(state.streams[key].configuration).length === 0 ||
                        !state.streams[key].configuration.namespace ||
                        !state.streams[key].configuration.advanced)
                ) {
                    stream_name = key;
                    break;
                }
            }
        }

        if (!state.configuration.name) {
            setSaveError("Provide a Name for connection.");
            return true;
        } else if (!state.configuration.schedule) {
            setSaveError("Select a Schedule for connection.");
            return true;
        } else if (!flag) {
            setSaveError("Atleast one Stream should be configured.");
            return true;
        } else if (stream_name.length > 0) {
            setSaveError(`Selected stream - ${stream_name} is not configured completely.`);
            return true;
        }
    };

    const { data, error, loading, statusCode, makeApiCall } = useApiCall(updateConnection, "POST");
    const handleSave = async () => {
        const session = await getSession();

        let patchCronString;
        if (state.configuration.schedule === "No Schedule") {
            patchCronString = "";
        } else {
            patchCronString =
                state.configuration.schedule === getScheduleString(state.configuration.cronSchedule)
                    ? state.configuration.cronSchedule
                    : getCronString(state.configuration.schedule);
        }

        const patchData = {
            source_instance_id: state.source.value.id,
            generator_instance_id: connectionData.generator_instance.id,
            destination_instance_id: connectionData.destination_instance.id,
            source_instance: connectionData.source_instance,
            generator_instance: connectionData.generator_instance,
            destination_instance: connectionData.destination_instance,
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
                    cron_expression: patchCronString,
                    timezone: "UTC",
                },
            },
            schedule_type: "manual",
        };

        if (!checkConnectionForError()) {
            const res = await makeApiCall(connectionData.id, patchData);

            if (res.status === 200) {
                toast(`Connection updated successfully.`);
                router.push("/connections");
            } else {
                toast.error("Failed to Update Connection");
            }
        }
    };

    React.useEffect(() => {
        if (state.configuration.name === null || state.configuration.schedule === null) {
            updateState("configuration", {
                name: connectionData.name,
                schedule:
                    connectionData.schedule.cron.cron_expression.length > 0
                        ? getScheduleString(connectionData.schedule.cron.cron_expression)
                        : "No Schedule",
                cronSchedule: connectionData.schedule.cron.cron_expression,
                status: "NOT_RUNNING",
            });
        }
    }, [state.configuration.name, state]);

    return (
        <div>
            <ConnectionConfiguration editMode={true} />
            <div className="flex flex-col justify-center">
                <div className="flex justify-center">
                    <Button size="sm" onClick={handleSave} disabled={loading}>
                        {loading && <CircularLoader />}Save
                    </Button>
                </div>

                {saveError && <p className="text-red-600 text-center text-sm">{saveError}</p>}
            </div>
        </div>
    );
}
