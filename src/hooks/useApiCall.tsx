import { useState, useEffect } from "react";

const useApiCall = (apiCallFunction, method = "GET") => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [statusCode, setStatusCode] = useState(null);

    const fetchData = async (...args) => {
        setLoading(true);
        try {
            const response = await apiCallFunction(...args);
            setData(response.data);
            setStatusCode(response.status);
        } catch (err) {
            setError(err);
            setStatusCode(err.response ? err.response.status : null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (method === "GET") {
            fetchData();
        }
    }, []);

    const makeApiCall = async (...args) => {
        if (method !== "GET") {
            await fetchData(...args);
        }
    };

    return { data, error, loading, statusCode, makeApiCall };
};

export default useApiCall;
