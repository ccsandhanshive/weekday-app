import React, { useState, useEffect } from 'react';
import FetchData from '../FetchData';
import Multiselect from 'multiselect-react-dropdown';
import multiselectStyles from '../styles'

function FilterCompanyNames({ onFilterChange }) {
  const [filter, setFilter] = useState([]);
  const [data, setData] = useState([]);
  const [uniqueCompanyNames, setUniqueCompanyNames] = useState([]);

  const handleDataFetched = (fetchedData) => {
    setData(fetchedData);
  };

  useEffect(() => {
    if (data.length > 0) {
      const companyNames = [...new Set(data.map(job => job.companyName))];
      setUniqueCompanyNames(companyNames);
    }
  }, [data]);

  const handleFilterChange = (selectedList) => {
    setFilter(selectedList.map(option => option.name)); // Extracting company names from selected options
    onFilterChange(selectedList.map(option => option.name));
  };

  return (
    <div>
      <FetchData onDataFetched={handleDataFetched} />
      <Multiselect
        options={uniqueCompanyNames.map(company => ({ name: company }))} // Transforming company names into options
        selectedValues={filter.map(company => ({ name: company }))} // Setting initially selected options
        onSelect={handleFilterChange} // Function to handle select event
        onRemove={handleFilterChange} // Function to handle remove event
        displayValue="name" // Property name to display in the dropdown
        placeholder="Serch company name" // Placeholder text
        style={multiselectStyles}
      />
    </div>
  );
}

export default FilterCompanyNames;
