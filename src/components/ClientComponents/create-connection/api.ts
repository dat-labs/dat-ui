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
    const res = await response.json();
    console.log("Result", res);
    return res;
};

export const deleteConnection = async (connection_id: string) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/connections/${connection_id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Api response was not ok");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.log(`Failed to delete item: ${error.message}`);
    }
};
