import React from "react";
import ConnectionConfiguration from "../create-connection/connection-configuration";
import { FromDataContext } from "../create-connection";

export default function EditStreams({ connectionData }) {
    const { state, updateState } = React.useContext(FromDataContext);
    React.useEffect(() => {
        if (state.configuration.name === null && state.configuration.schedule === null) {
            updateState("configuration", {
                name: connectionData.name,
                schedule: "Every 1 hour",
            });
        }
    }, [state.configuration.name, state.configuration.schedule]);
    return (
        <div>
            <ConnectionConfiguration />
        </div>
    );
}
