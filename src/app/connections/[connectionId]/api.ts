export const getConnectionData = async (connectionId: string, wkspc_id: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/connections/${connectionId}?workspace_id=${wkspc_id}`);
    const responseData = await response.json();
    return { data: responseData, status: response.status };
};

export const updateConnection = async (connectionId: string, data: any, wkspc_id: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/connections/${connectionId}?workspace_id=${wkspc_id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    const responseData = await response.json();
    return { data: responseData, status: response.status };
};

export const manualRunConnection = async (connectionId: string, wkspc_id: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/connections/${connectionId}/run?workspace_id=${wkspc_id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const responseData = await response.json();
    return { data: responseData, status: response.status };
};

export const getConnectionAggRunLogs = async (connectionId: string, wkspc_id: string) => {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/connection-run-logs/${connectionId}/agg-run-logs?workspace_id=${wkspc_id}`
    );
    const responseData = await response.json();
    return { data: responseData, status: response.status };
};

export const getConnectionRunLogs = async (run_Id: string, wkspc_id: string) => {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/connection-run-logs/runs/${run_Id}?workspace_id=${wkspc_id}`
    );
    const responseData = await response.json();
    return { data: responseData, status: response.status };
};
