export const createNewUser = async (data: any) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_AUTH_API_URL}/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    const responseData = await response.json();
    return { responseData, status: response.status };
};
