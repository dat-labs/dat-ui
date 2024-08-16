import cron from "cron-validate";
import { useState } from "react";

/** Check if connection is having Name , Schedule and atleast one stream configured */
const useCheckConnection = (state: any) => {
    const [saveError, setSaveError] = useState<string | null>(null);

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
        } else if (state.configuration.schedule === "Advanced Scheduling" && !cron(state.configuration?.cronSchedule).isValid()) {
            setSaveError("Provide a valid Cron Schedule.");
            return true;
        } else if (!flag) {
            setSaveError("Atleast one Stream should be configured.");
            return true;
        } else if (stream_name.length > 0) {
            setSaveError(`Selected stream - ${stream_name} is not configured completely.`);
            return true;
        } else {
            return false;
        }
    };

    return { saveError, checkConnectionForError };
};

export default useCheckConnection;
