import { createContext, useState } from "react";

const workspaceData = {
    name: null,
    id: null,
};

export const WorkspaceDataContext = createContext(null);

export const WorkspaceContextProvider = ({ children }: { children: any }) => {
    const [curWorkspace, setWorkspace] = useState(workspaceData);

    const updateCurrentWorkspace = (wkspc_id, wkspc_name) => {
        setWorkspace({
            id: wkspc_id,
            name: wkspc_name,
        });
    };

    return (
        <WorkspaceDataContext.Provider value={{ curWorkspace, updateCurrentWorkspace }}>{children}</WorkspaceDataContext.Provider>
    );
};
