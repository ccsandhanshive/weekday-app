import React, { useState, useEffect } from 'react';
import Grid from './component/Grid';
import Filter from './component/filters/MinExp.js';
import FetchData from './component/FetchData';
import FilterCompanyNames from './component/filters/Compayame.js';
import FilterLocations from './component/filters/location.js'
import FilterMinBasePay from './component/filters/Minbasepay.js'
import FilterRole from './component/filters/Role.js'

function JobCard(props) {
  const [expanded, setExpanded] = useState(false);

  const toggleDescription = () => {
    setExpanded(!expanded);
  };
  return (
    <div class="card">
      <div >
        <h4>{props.company}</h4>
        <h4>{props.title}</h4>
      </div>
      <p class="cards-sub-text">{props.location}</p>
      <p>{expanded ? props.description : `${props.description.slice(0, 100)}...`}</p>
      <div style={{ textAlign: 'center' }}><a href="#" onClick={toggleDescription}>
          {expanded ? 'Collapse' : 'Read more'}
        </a></div>
      <div class="MuiBox-root css-1m7bgf1">Minimum experience:</div>
      <div class="MuiBox-root css-1m7bgf1">{props.experience} Years</div>
      <button class="apply MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-colorPrimary MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-colorPrimary css-1dyt7kc" tabindex="0" type="button" id="custom-btn" >⚡ Easy Apply<span class="MuiTouchRipple-root css-w0pj6f"></span></button>
    </div>
  );
}

function App() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState(data);


  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const handleDataFetched = (fetchedData) => {
    setData(fetchedData);
  };

  const handleFilterChange = (filterValue) => {
    if (filterValue === '') {
      setFilteredData(data);
    } else {
      const filtered = data.filter(item => item.minExp == filterValue); // Filter based on your data structure
      setFilteredData(filtered);
    }
  };

  const handleComapanyNameChange = (filterValue) => {
    if (filterValue === '') {
      setFilteredData(data);
    } else {
      const filtered = data.filter(item => item.companyName == filterValue); // Filter based on your data structure
      setFilteredData(filtered);
    }
  };

  const handleLocationChange = (filterValue) => {
    if (filterValue === '') {
      setFilteredData(data);
    } else {
      const filtered = data.filter(item => item.location  == filterValue); // Filter based on your data structure
      setFilteredData(filtered);
    }
  };

  const handleMinPayChange = (filterValue) => {
    if (filterValue === '') {
      setFilteredData(data);
    } else {
      const filtered = data.filter(item => item.minJdSalary  == filterValue); // Filter based on your data structure
      setFilteredData(filtered);
    }
  };

  const handleRoleChange = (filterValue) => {
    if (filterValue === '') {
      setFilteredData(data);
    } else {
      const filtered = data.filter(item => item.jobRole == filterValue); // Filter based on your data structure
      setFilteredData(filtered);
    }
  };

  return (
    <>
    <Grid>
      <FetchData onDataFetched={handleDataFetched} />
      <Filter onFilterChange={handleFilterChange} />
      <FilterCompanyNames onFilterChange={handleComapanyNameChange} />
      <FilterLocations onFilterChange={handleLocationChange} />
      <FilterMinBasePay onFilterChange={handleMinPayChange} />
      <FilterRole onFilterChange={handleRoleChange} />
      </Grid>
      <Grid>
      {filteredData.map((job, index) => (
      <JobCard
        title={job.jobRole}
        company={job.companyName}
        location={job.location}
        description={job.jobDetailsFromCompany}
        experience={job.minExp}
      />
    ))}
    </Grid>
    </>
  );
}

export default App;
