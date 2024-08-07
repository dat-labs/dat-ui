import React, { useState } from "react";
import ConnectionConfiguration from "../create-connection/connection-configuration";
import { FromDataContext, getStremsData } from "../create-connection";
import { Button } from "@/components/ui/button";
import { updateConnection } from "@/app/connections/[connectionId]/api";
import useApiCall from "@/hooks/useApiCall";
import CircularLoader from "@/components/ui/circularLoader";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function EditStreams({ connectionData }) {
    const router = useRouter();

    const { state, updateState } = React.useContext(FromDataContext);
    const [saveError, setSaveError] = useState("");

    const checkConnectionForError = () => {
        let flag = false;
        for (let key in state.streams) {
            if (state.streams.hasOwnProperty(key) && state.streams[key].configuration?.name) {
                flag = true;
                break;
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
        }
    };

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
                schedule: "Every 1 hour",
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
