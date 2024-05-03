export const getStreamsForSource = async (sourceId: string) => {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/actor_instances/${sourceId}/discover?actor_instance_id=${sourceId}`
    );
    const data = await response.json();
    return data;
};
