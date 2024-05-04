import React, { useState, useEffect } from 'react';
import FetchData from '../FetchData';
import Multiselect from 'multiselect-react-dropdown';
import multiselectStyles from '../styles'

function FilterminExp({ onFilterChange }) {
  const [filter, setFilter] = useState([]);
  const [data, setData] = useState([]);
  const [uniqueminExp, setuniqueminExp] = useState([]);

  const handleDataFetched = (fetchedData) => {
    setData(fetchedData);
  };

  useEffect(() => {
    if (data.length > 0) {
      const minExp = [...new Set(data.map(job => `${job.minExp}`))];
      setuniqueminExp(minExp);
    }
  }, [data]);

  const handleFilterChange = (selectedList) => {
    setFilter(selectedList.map(option => option.uniqueminExp));
    onFilterChange(selectedList.map(option => option.uniqueminExp));
  };

  return (
    <div>
      <FetchData onDataFetched={handleDataFetched} />
      <Multiselect
        options={uniqueminExp.map(minExp => ({ uniqueminExp: minExp }))} 
        selectedValues={filter.map(minExp => ({ uniqueminExp: minExp }))} 
        onSelect={handleFilterChange} 
        onRemove={handleFilterChange}
        displayValue="uniqueminExp" 
        placeholder="Experience"
        style={multiselectStyles}
      />
    </div>
  );
}

export default FilterminExp;
