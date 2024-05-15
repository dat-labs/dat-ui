export const getConnectionData = async (connectionId: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/connections/${connectionId}`);
    const responseData = await response.json();
    return { data: responseData, status: response.status };
};
