import React, { useState, useEffect } from 'react';

function FetchData({ onDataFetched }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data here
    const fetchData = async () => {
      try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const body = JSON.stringify({
          "limit": 100,
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
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error(error);
        setError(error); // Set error state if an error occurs
        setLoading(false); // Set loading to false even if there's an error
      }
    };

    fetchData();
  }, []);

  // Pass the fetched data to the parent component
  onDataFetched(data);

  return null; // Component doesn't render anything directly, data is passed to parent component
}

export default FetchData;
