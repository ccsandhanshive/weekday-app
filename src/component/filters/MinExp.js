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
        options={uniqueminExp.map(minExp => ({ uniqueminExp: minExp }))} // Transforming company names into options
        selectedValues={filter.map(minExp => ({ uniqueminExp: minExp }))} // Setting initially selected options
        onSelect={handleFilterChange} // Function to handle select event
        onRemove={handleFilterChange} // Function to handle remove event
        displayValue="uniqueminExp" // Property name to display in the dropdown
        placeholder="Experience" // Placeholder text
        style={multiselectStyles}
      />
    </div>
  );
}

export default FilterminExp;
