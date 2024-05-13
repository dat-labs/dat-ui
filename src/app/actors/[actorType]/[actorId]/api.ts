export const updateActorInstance = async (actorId:string, data: any) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/actor_instances/${actorId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    const responseData = await response.json();
    return responseData;
};
