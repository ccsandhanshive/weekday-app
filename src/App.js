import React, { useState, useEffect } from 'react';
import Grid from './component/Grid'; // Import the Grid component

function JobCard(props) {
  return (
    <div class="card">
      <div >
        <h4>{props.company}</h4>
        <h4>{props.title}</h4>
      </div>
      <p class="cards-sub-text">{props.location}</p>
      <div class="MuiBox-root css-1m7bgf1">{props.description}</div>
      <div class="MuiBox-root css-1m7bgf1">Minimum experience:</div>
      <div class="MuiBox-root css-1m7bgf1">{props.experience} Years</div>
      <button class="apply MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-colorPrimary MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-colorPrimary css-1dyt7kc" tabindex="0" type="button" id="custom-btn" >⚡ Easy Apply<span class="MuiTouchRipple-root css-w0pj6f"></span></button>
    </div>
  );
}

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data here
    const fetchData = async () => {
      try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const body = JSON.stringify({
          "limit": 10,
          "offset": 0
        });

        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body
        };

        const response = await fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", requestOptions);
        const result = await response.json();
        console.log(result.jdList);
        setData(result.jdList);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this effect runs only once

  return (
    <Grid>
      {data.map((job, index) => (
      <JobCard
        title={job.jobRole}
        company={job.companyName}
        location={job.location}
        description={job.jobDetailsFromCompany}
        experience={job.minExp}
      />
    ))}
    </Grid>
  );
}

export default App;
