/**
 * Updates an actor instance with the given data.
 *
 * @param {string} actorId - The ID of the actor to be updated.
 * @param {any} data - The data to update the actor with.
 * @returns {Promise<any>} The response data from the API.
 */
export const updateActorInstance = async (actorId: string, data: any, wkspc_id: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/actor_instances/${actorId}?workspace_id=${wkspc_id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    const responseData = await response.json();
    return { responseData, status: response.status };
};

/**
 * Deletes an actor instance with the given ID.
 *
 * @param {string} actorId - The ID of the actor to be deleted.
 * @returns {Promise<any|void>} The response data from the API or undefined if an error occurs.
 */
export const deleteActorInstance = async (actorId: string, wkspc_id: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/actor_instances/${actorId}?workspace_id=${wkspc_id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const responseData = await response.json();
    const status = response.status;
    return { responseData, status };
};
