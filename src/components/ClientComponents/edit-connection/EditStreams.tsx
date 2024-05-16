import React from "react";
import ConnectionConfiguration from "../create-connection/connection-configuration";
import { FromDataContext, getStremsData } from "../create-connection";
import { Button } from "@/components/ui/button";
import { updateConnection } from "@/app/connections/[connectionId]/api";
import useApiCall from "@/hooks/useApiCall";
import CircularLoader from "@/components/ui/circularLoader";
import { toast } from "sonner";

export default function EditStreams({ connectionData }) {
    const { state, updateState } = React.useContext(FromDataContext);

    const { data, error, loading, statusCode, makeApiCall } = useApiCall(updateConnection, "POST");

    const handleSave = async () => {
        const patchData = {
            source_instance_id: state.source.value.id,
            generator_instance_id: connectionData.generator_instance.id,
            destination_instance_id: connectionData.destination_instance.id,
            source_instance: connectionData.source_instance,
            generator_instance: connectionData.generator_instance,
            destination_instance: connectionData.destination_instance,
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
        console.log(patchData);
        const res = await makeApiCall(connectionData.id, patchData);
        toast(`Connection updated successfully.`);
    };
    React.useEffect(() => {
        if (state.configuration.name === null || state.configuration.schedule === null) {
            updateState("configuration", {
                name: connectionData.name,
                schedule: "Every 1 hour",
            });
        }
    }, [state.configuration.name, state]);
    return (
        <div>
            <ConnectionConfiguration />
            <div className="flex justify-center">
                <Button onClick={handleSave} disabled={loading}>
                    {" "}
                    {loading && <CircularLoader />}Save
                </Button>
            </div>
        </div>
    );
}
