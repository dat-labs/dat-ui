export const getConnectionsData = async (wkspc_id: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/connections/list?workspace_id=${wkspc_id}`);
    const data = await response.json();
    return { data, status: response.status };
};
