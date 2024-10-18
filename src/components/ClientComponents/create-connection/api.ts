export const getStreamsForSource = async (sourceId: string, wkspc_id: string) => {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/actor_instances/${sourceId}/discover?workspace_id=${wkspc_id}`
    );
    const data = await response.json();
    return data;
};

export const addConnection = async (data: object, wkspc_id: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/connections?workspace_id=${wkspc_id}`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    });
    const responseData = await response.json();
    return { responseData, status: response.status };
};

export const deleteConnection = async (connection_id: string, wkspc_id: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/connections/${connection_id}?workspace_id=${wkspc_id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response;
};

export const checkActor = async (actor_instance_id: string, wkspc_id: string) => {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/actor_instances/${actor_instance_id}/check?workspace_id=${wkspc_id}`, 
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
    return response;
};