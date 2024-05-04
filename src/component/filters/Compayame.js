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
      const companyNames = [...new Set(data.map(job => job.companyName))]; //To avoid duplicate company names
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
        onSelect={handleFilterChange} 
        onRemove={handleFilterChange} 
        displayValue="name" 
        placeholder="Serch company name"
        style={multiselectStyles}
      />
    </div>
  );
}

export default FilterCompanyNames;
