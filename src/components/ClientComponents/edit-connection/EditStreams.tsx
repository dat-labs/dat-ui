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
import { getCronString, getScheduleString } from "@/lib/utils";
import useCheckConnection from "@/hooks/checkConnectionError";

export default function EditStreams({ connectionData }) {
    const router = useRouter();
    const { state, updateState } = React.useContext(FromDataContext);
    const { saveError, checkConnectionForError } = useCheckConnection(state);

    console.log(connectionData);
    const { loading, makeApiCall } = useApiCall(updateConnection, "POST");

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
                    state.configuration.schedule === "No Schedule"
                        ? ""
                        : state.configuration.schedule === getScheduleString(state.configuration.cronSchedule)
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
                status: state.configuration.connectionStatus,
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

            const res = await makeApiCall(connectionData.id, patchData, session?.user?.workspace_id);

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
            let scheduleText, cronExpression;
            if (connectionData.schedule.cron.advanced_scheduling === "Advanced Scheduling") {
                scheduleText = "Advanced Scheduling";
                cronExpression = connectionData.schedule.cron.cron_expression;
            } else {
                scheduleText =
                    connectionData.schedule.cron.cron_expression.length > 0
                        ? getScheduleString(connectionData.schedule.cron.cron_expression)
                        : "No Schedule";
                cronExpression = connectionData.schedule.cron.cron_expression;
            }

            updateState("configuration", {
                name: connectionData.name,
                schedule: scheduleText,
                cronSchedule: cronExpression,
                status: "NOT_RUNNING",
                connectionStatus: connectionData.status,
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
                {saveError && <p className="text-red-600 text-center mb-2">{saveError}</p>}
            </div>
        </div>
    );
}
