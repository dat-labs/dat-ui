export const getStreamsForSource = async (sourceId: string) => {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/actor_instances/${sourceId}/discover?actor_instance_id=${sourceId}`
    );
    const data = await response.json();
    return data;
};

export const addConnection = async (data: object) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/connections`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    });
    const responseData = await response.json();
    return { responseData, status: response.status };
};

export const deleteConnection = async (connection_id: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/connections/${connection_id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });

    console.log("API response :", response);

    const responseData = await response.json();
    return { responseData, status: response.status, ok: response.ok };
};
