export const getConnectionData = async (connectionId: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/connections/${connectionId}`);
    const responseData = await response.json();
    return { data: responseData, status: response.status };
};

export const updateConnection = async (connectionId: string, data: any) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/connections/${connectionId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    const responseData = await response.json();
    return { data: responseData, status: response.status };
};

export const manualRunConnection = async (connectionId: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/connections/${connectionId}/run`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const responseData = await response.json();
    return { data: responseData, status: response.status };
};

export const getConnectionAggRunLogs = async (connectionId: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/connection-run-logs/${connectionId}/agg-run-logs`);
    const responseData = await response.json();
    return { data: responseData, status: response.status };
};

export const getConnectionViewLogs = async (connectionId: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/connection-run-logs/${connectionId}/runs`);
    const responseData = await response.json();
    return { data: responseData, status: response.status };
};

export const getConnectionRunLogs = async (run_Id: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/connection-run-logs/runs/${run_Id}`);
    const responseData = await response.json();
    return { data: responseData, status: response.status };
};
