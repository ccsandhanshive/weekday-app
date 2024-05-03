import React, { useState, useEffect } from 'react';
import FetchData from '../FetchData';
import Multiselect from 'multiselect-react-dropdown';
import multiselectStyles from '../styles'

function FilterLocations({ onFilterChange }) {
  const [filter, setFilter] = useState([]);
  const [data, setData] = useState([]);
  const [uniquelocation, setuniquelocation] = useState([]);

  const handleDataFetched = (fetchedData) => {
    setData(fetchedData);
  };

  useEffect(() => {
    if (data.length > 0) {
      const locations = [...new Set(data.map(job => job.location))];
      setuniquelocation(locations);
    }
  }, [data]);

  const handleFilterChange = (selectedList) => {
    setFilter(selectedList.map(option => option.location)); // Extracting company names from selected options
    onFilterChange(selectedList.map(option => option.location));
  };

  return (
    <div>
      <FetchData onDataFetched={handleDataFetched} />
      <Multiselect
        options={uniquelocation.map(location => ({ location: location
         }))} // Transforming company names into options
        selectedValues={filter.map(location => ({ location: location }))} // Setting initially selected options
        onSelect={handleFilterChange} // Function to handle select event
        onRemove={handleFilterChange} // Function to handle remove event
        displayValue="location" // Property name to display in the dropdown
        placeholder="location" // Placeholder text
        style={multiselectStyles}
      />
    </div>
  );
}

export default FilterLocations;
