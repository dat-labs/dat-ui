export const getConnectionsData = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/connections/list`);
    const data = await response.json();
    return data;
};
