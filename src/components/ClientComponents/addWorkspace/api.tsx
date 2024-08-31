export const createWorkspace = async (data: any) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/workspaces`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    const responseData = await response.json();
    return { responseData, status: response.status };
};

export const getWorkspaces = async (organization_id: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/workspaces/list?org_id=${organization_id}`);
    const responseData = await response.json();
    return { responseData, status: response.status };
};
