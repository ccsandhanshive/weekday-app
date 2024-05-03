import React, { useState, useEffect } from 'react';
import FetchData from '../FetchData';
import Multiselect from 'multiselect-react-dropdown';
import multiselectStyles from '../styles'

function FilterRole({ onFilterChange }) {
  const [filter, setFilter] = useState([]);
  const [data, setData] = useState([]);
  const [uniqueRoles, setUniqueRoles] = useState([]);

  const handleDataFetched = (fetchedData) => {
    setData(fetchedData);
  };

  useEffect(() => {
    if (data.length > 0) {
      const Roles = [...new Set(data.map(job => job.jobRole))];
      setUniqueRoles(Roles);
    }
  }, [data]);

  const handleFilterChange = (selectedList) => {
    setFilter(selectedList.map(option => option.uniqueRoles)); // Extracting company names from selected options
    onFilterChange(selectedList.map(option => option.jobRole));
  };

  return (
    <div>
      <FetchData onDataFetched={handleDataFetched} />
      <Multiselect
        options={uniqueRoles.map(role => ({ uniqueRoles: role }))} // Transforming company names into options
        selectedValues={filter.map(role => ({ uniqueRoles: role }))} // Setting initially selected options
        onSelect={handleFilterChange} // Function to handle select event
        onRemove={handleFilterChange} // Function to handle remove event
        displayValue="uniqueRoles" // Property name to display in the dropdown
        placeholder="Roles" // Placeholder text
        style={multiselectStyles}
      />
    </div>
  );
}

export default FilterRole;
