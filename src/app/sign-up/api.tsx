export const createNewUser = async (data: any) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    const responseData = await response.json();
    return { responseData, status: response.status };
};

export const createNewOrganization = async (data: any) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/organizations`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    const responseData = await response.json();
    return { responseData, status: response.status };
};

export const addWorkspaceUser = async (data: any) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/workspace_users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    const responseData = await response.json();
    return { responseData, status: response.status };
};
