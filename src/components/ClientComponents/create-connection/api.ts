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
    return res;
};
