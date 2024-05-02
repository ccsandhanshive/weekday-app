import React, { useEffect } from 'react';

function JobCard(props) {
  return (
    <div class="card">
  <div class="container">
     <div id="smallsquare">
          <p class="MuiTypography-root MuiTypography-body1 css-9spv16" style={{fontSize: '10px'}}>⏳ Posted 16 days ago</p>
        </div>
            <div>
              <div >
                <h4>{props.company}</h4>
                <h4>{props.title}</h4>
              </div>
                <p class="cards-sub-text">{props.location}</p>
            <div class="jd-link-container">
              <div class="hard-lang-container">
            </div>
          </div>
          <div class="MuiBox-root css-3nq2nx">
            <div class="MuiBox-root css-0">
              <div class="MuiBox-root css-1m7bgf1">{props.description}</div>
            </div>
          </div>
        </div>
        <div class="MuiBox-root css-1m7bgf1">Minimum experience:</div>
        <div class="MuiBox-root css-1m7bgf1">{props.experience}</div>
      </div>    
        <button class="apply MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-colorPrimary MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-colorPrimary css-1dyt7kc" tabindex="0" type="button" id="custom-btn" >⚡ Easy Apply<span class="MuiTouchRipple-root css-w0pj6f"></span></button>
    </div>

  );
}

function App() {
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
        const result = await response.text();
        console.log(result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this effect runs only once

  return (
    <div>
      <JobCard
        title="Frontend Developer"
        company="XYZ Technologies"
        location="San Francisco, CA"
        description="We are seeking a skilled Frontend Developer to join our dynamic team. The ideal candidate should have experience with modern frontend frameworks and a passion for creating responsive and intuitive user interfaces."
        experience="2-4 years of experience"
      />
    </div>
  );
}

export default App;
