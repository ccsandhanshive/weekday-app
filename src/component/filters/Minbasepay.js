import React, { useState, useEffect } from 'react';
import FetchData from '../FetchData';
import Multiselect from 'multiselect-react-dropdown';
import multiselectStyles from '../styles'

function FilterMinBasepay({ onFilterChange }) {
  const [filter, setFilter] = useState([]);
  const [data, setData] = useState([]);
  const [uniqueminbasepay, setuniqueminbasepay] = useState([]);

  const handleDataFetched = (fetchedData) => {
    setData(fetchedData);
  };

  useEffect(() => {
    if (data.length > 0) {
      const minJdSalary = [...new Set(data.map(job => `${job.minJdSalary}`))];
      setuniqueminbasepay(minJdSalary);
    }
  }, [data]);

  const handleFilterChange = (selectedList) => {
    setFilter(selectedList.map(option => option.minJdSalary));
    onFilterChange(selectedList.map(option => option.minJdSalary));
  };

  return (
    <div>
      <FetchData onDataFetched={handleDataFetched} />
      Min base pay
      <Multiselect
        options={uniqueminbasepay.map(minJdSalary => ({ minJdSalary: minJdSalary }))} // Transforming company names into options
        selectedValues={filter.map(minJdSalary => ({ minJdSalary: minJdSalary }))} // Setting initially selected options
        onSelect={handleFilterChange} // Function to handle select event
        onRemove={handleFilterChange} // Function to handle remove event
        displayValue="minJdSalary" // Property name to display in the dropdown
        placeholder="Select options" // Placeholder text
        style={multiselectStyles}
      />
    </div>
  );
}

export default FilterMinBasepay;
