import { useState, useEffect } from 'react';

const useSearch = (data, searchKey) => {
  const [query, setQuery] = useState('');
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    if (query === '') {
      setFilteredData(data);
    } else {
      setFilteredData(
        data.filter(item => 
          item[searchKey].toLowerCase().includes(query.toLowerCase())
        )
      );
    }
  }, [query, data, searchKey]);

  return {
    query,
    setQuery,
    filteredData
  };
};

export default useSearch;