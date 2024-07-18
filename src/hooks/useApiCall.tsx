import { useState, useEffect } from "react";

/**
 * Custom hook for making API calls with loading, error, and status code handling.
 *
 * @param {Function} apiCallFunction - Function that makes the API call.
 * @param {string} [method="GET"] - HTTP method for the API call (default is "GET").
 * @returns {Object} Object containing data, error, loading state, status code, and a function to make the API call.
 */
const useApiCall = (apiCallFunction, method = "GET") => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [statusCode, setStatusCode] = useState(null);

    /**
     * Function to make the API call.
     * Calls fetchData function and returns the response.
     *
     * @param {...any} args - Arguments passed to the apiCallFunction.
     * @returns {Promise<any>} Promise that resolves with the API response data.
     */
    const makeApiCall = async (...args) => {
        const res = await fetchData(...args);
        return res;
    };

    /**
     * Function to fetch data from the API.
     * Sets loading state to true, makes the API call,
     * updates state based on response, and handles errors.
     *
     * @param {...any} args - Arguments passed to the apiCallFunction.
     * @returns {Promise<any>} Promise that resolves with the API response data.
     */
    const fetchData = async (...args) => {
        setLoading(true);
        try {
            const response = await apiCallFunction(...args);
            setData(response);
            setStatusCode(response?.status);
            return response;
        } catch (err) {
            setError(err);
            setStatusCode(err.response ? err.response.status : null);
        } finally {
            setLoading(false);
        }
    };

    return { data, error, loading, statusCode, makeApiCall };
};

export default useApiCall;
