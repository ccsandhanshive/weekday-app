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
    setFilter(selectedList.map(option => option.uniqueRoles));
    onFilterChange(selectedList.map(option => option.uniqueRoles));
  };

  return (
    <div>
      <FetchData onDataFetched={handleDataFetched} />
      <Multiselect
        options={uniqueRoles.map(role => ({ uniqueRoles: role }))}
        selectedValues={filter.map(role => ({ uniqueRoles: role }))}
        onSelect={handleFilterChange}
        onRemove={handleFilterChange}
        displayValue="uniqueRoles"
        placeholder="Roles"
        style={multiselectStyles}
      />
    </div>
  );
}

export default FilterRole;
