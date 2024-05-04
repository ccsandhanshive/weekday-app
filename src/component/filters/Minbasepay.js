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
      <Multiselect
        options={uniqueminbasepay.map(minJdSalary => ({ minJdSalary: minJdSalary }))} 
        selectedValues={filter.map(minJdSalary => ({ minJdSalary: minJdSalary }))} 
        onSelect={handleFilterChange} 
        onRemove={handleFilterChange} 
        displayValue="minJdSalary" 
        placeholder="Min base pay salary" 
        style={multiselectStyles}
      />
    </div>
  );
}

export default FilterMinBasepay;
