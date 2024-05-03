import React, { useState } from 'react';

function Filter({ onFilterChange }) {
  const [filter, setFilter] = useState('');

  const numbers = [];

  // Using a for loop to generate numbers 1 to 10
  for (let i = 1; i <= 10; i++) {
    numbers.push(i);
  }

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilter(value);
    onFilterChange(value);
  };

  return (
    <div>
        Min experience
      <select value={filter} onChange={handleFilterChange}>
        <option value=""></option>
        {numbers.map((number, index) => (
        <option value={number}>{number}</option>
    ))}
      </select>
    </div>
  );
}

export default Filter;
