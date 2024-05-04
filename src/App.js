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
      <div className='grid-adj'>
        <img 
          src={props.imgurl} 
          alt="Job Image" 
          style={{ width: '50px', height: 'auto' }}
        />
        <div>
        <div style={{fontWeight: 'bold',color: 'GrayText'}}><h8>{props.company}</h8></div>
        <div><h8>{props.title}</h8></div>
        <h10 style={{fontSize: '12px'}}>{props.location}</h10>
        </div>
      </div>
      
      <div>
  {expanded ? 
    props.description : 
    <p style={{ filter: 'opacity(50%)' }}>
      {`${props.description.slice(0, 100)}...`}
    </p>
  }
</div>
      <div style={{ textAlign: 'center' }}><a href="#" onClick={toggleDescription}>
          {expanded ? 'Collapse' : 'Expand'}
        </a></div>
      <div style={{font: '12px Verdana',color: 'GrayText'}}>Minimum experience:</div>
      <div style={{fontSize: '12px',fontFamily: 'Tahoma'}}>{props.experience} Years</div>
      <button class="apply MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-colorPrimary MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-colorPrimary css-1dyt7kc" tabindex="0" type="button" id="custom-btn" >⚡ Easy Apply<span class="MuiTouchRipple-root css-w0pj6f"></span></button>
    </div>
  );
}

function App() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [FilterLocationArray, setFilterLocationArray] = useState([]);
  const [FilterCompayNameArray, setFilterCompayNameArray] = useState([]);
  const [FilterMinPayArray, setFilterMinPayArray] = useState([]);
  const [FilterRoleArray, setFilterRoleArray] = useState([]);
  const [FilterMinExpArray, setFilterMinExpArray] = useState([]);


  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  useEffect(() => {
    refreshCurrentData();
  }, [FilterLocationArray, FilterCompayNameArray, FilterMinPayArray, FilterRoleArray, FilterMinExpArray]);

  const handleDataFetched = (fetchedData) => {
    setData(fetchedData);
  };

  const refreshCurrentData = () => {
    const filtered = data.filter(item =>
      (FilterLocationArray.length === 0 || FilterLocationArray.includes(item.location)) &&
      (FilterCompayNameArray.length === 0 || FilterCompayNameArray.includes(item.companyName)) &&
      (FilterRoleArray.length === 0 || FilterRoleArray.includes(item.jobRole)) &&
      (FilterMinExpArray.length === 0 || FilterMinExpArray.includes(`${item.minExp}`)) &&
      (FilterMinPayArray.length === 0 || FilterMinPayArray.includes(`${item.minJdSalary}`))
    );
    setFilteredData(filtered);
  } 

  const handleFilterChange = (filterValue) => {
    setFilterMinExpArray(filterValue);
    // if (filterValue === '') {
    //   setFilteredData(data);
    // } else {
    //   const filtered = data.filter(item => item.minExp == filterValue); // Filter based on your data structure
    //   setFilteredData(filtered);
    // }
  };

  const handleComapanyNameChange = (filterValue) => {
    setFilterCompayNameArray(filterValue)
    refreshCurrentData()
    // if (filterValue === '') {
    //   setFilteredData(data);
    // } else {
    //   const filtered = data.filter(item => item.companyName == filterValue); // Filter based on your data structure
    //   setFilteredData(filtered);
    // }
  };

  const handleLocationChange = (filterValue) => {
    setFilterLocationArray(filterValue)
    refreshCurrentData()
    // if (filterValue === '') {
    //   setFilteredData(data);
    // } else {
    //   const filtered = data.filter(item => item.location  == filterValue); // Filter based on your data structure
    //   setFilteredData(filtered);
    // }
  };

  const handleMinPayChange = (filterValue) => {
    setFilterMinPayArray(filterValue)
    refreshCurrentData()
    // if (filterValue === '') {
    //   setFilteredData(data);
    // } else {
    //   const filtered = data.filter(item => item.minJdSalary  == filterValue); // Filter based on your data structure
    //   setFilteredData(filtered);
    // }
  };

  const handleRoleChange = (filterValue) => {
    setFilterRoleArray(filterValue)
    refreshCurrentData()
    // console.log(filterValue[0])
    // if (filterValue[0] === undefined) {
    //   setFilteredData(data);
    // } else {
    //   const filtered = data.filter(item => item.jobRole == filterValue); // Filter based on your data structure
    //   setFilteredData(filtered);
    // }
  };

  return (
    <>
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '20px'}}>
      <FetchData onDataFetched={handleDataFetched} />
      <Filter onFilterChange={handleFilterChange} />
      <FilterCompanyNames onFilterChange={handleComapanyNameChange} />
      <FilterLocations onFilterChange={handleLocationChange} />
      <FilterMinBasePay onFilterChange={handleMinPayChange} />
      <FilterRole onFilterChange={handleRoleChange} />
      </div>
      <Grid>
      {filteredData.map((job, index) => (
      <JobCard
        title={job.jobRole}
        company={job.companyName}
        location={job.location}
        description={job.jobDetailsFromCompany}
        experience={job.minExp}
        imgurl={job.logoUrl}
      />
    ))}
    </Grid>
    </>
  );
}

export default App;
