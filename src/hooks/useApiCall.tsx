import { useState, useEffect } from "react";

const useApiCall = (apiCallFunction: any) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [statusCode, setStatusCode] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await apiCallFunction();
                setData(response.data);
                setStatusCode(response.status);
            } catch (err: any) {
                setError(err);
                setStatusCode(err.response ? err.response.status : null);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { data, error, loading, statusCode };
};

export default useApiCall;
