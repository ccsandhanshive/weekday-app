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
    setFilter(selectedList.map(option => option.location)); // Extracting locations from selected options
    onFilterChange(selectedList.map(option => option.location));
  };

  return (
    <div>
      <FetchData onDataFetched={handleDataFetched} />
      <Multiselect
        options={uniquelocation.map(location => ({ location: location
         }))} 
        selectedValues={filter.map(location => ({ location: location }))}
        onSelect={handleFilterChange} 
        onRemove={handleFilterChange} 
        displayValue="location" 
        placeholder="location"
        style={multiselectStyles}
      />
    </div>
  );
}

export default FilterLocations;
