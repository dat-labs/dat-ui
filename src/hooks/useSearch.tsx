import { useState, useEffect } from "react";

/**
 * Custom hook for searching through a dataset based on a search key.
 *
 * @param data - The dataset to search through.
 * @param searchKey - The key in the dataset objects to search by.
 * @returns query - The current search query.
 * @returns setQuery - Function to update the search query.
 * @returns filteredData - The filtered dataset based on the search query.
 */

const useSearch = (data, searchKey, forTable) => {
    const [query, setQuery] = useState("");
    const [filteredData, setFilteredData] = useState(data);

    useEffect(() => {
        if (query === "") {
            setFilteredData(data);
        } else {
            if (forTable) {
                setFilteredData(data.filter((item) => item.original[searchKey].toLowerCase().includes(query.toLowerCase())));
            } else {
                setFilteredData(data.filter((item) => item[searchKey].toLowerCase().includes(query.toLowerCase())));
            }
        }
    }, [query, data, searchKey]);

    return {
        query,
        setQuery,
        filteredData,
    };
};

export default useSearch;
