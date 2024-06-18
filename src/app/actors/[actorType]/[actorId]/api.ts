/**
 * Updates an actor instance with the given data.
 *
 * @param {string} actorId - The ID of the actor to be updated.
 * @param {any} data - The data to update the actor with.
 * @returns {Promise<any>} The response data from the API.
 */
export const updateActorInstance = async (actorId: string, data: any) => {
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

/**
 * Deletes an actor instance with the given ID.
 *
 * @param {string} actorId - The ID of the actor to be deleted.
 * @returns {Promise<any|void>} The response data from the API or undefined if an error occurs.
 */
export const deleteActorInstance = async (actorId: string) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/actor_instances/${actorId}`, {
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
