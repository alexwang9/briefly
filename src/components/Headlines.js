import React, {useEffect, useState} from 'react';
import axios from 'axios';

const Headlines = () => {
  const [headlines, setHeadlines] = useState([]);
  const API_KEY = 'umCqfhFeDPGicqInVXME5NcDGb1CvNBr';
  const API_URL = `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${API_KEY}`;

  useEffect(() => {
    const fetchHeadlines = async () => {
      try {
        const response = await axios.get(API_URL);
        setHeadlines(response.data.results.slice(0,5));
      } catch(error) {
        console.error('Error fetching the headlines:', error);
      }
    };

    fetchHeadlines();
  }, [API_URL]);

  return (
    <>
      <h2>recent headlines</h2>
      <div className="headlines">
        {headlines.map((headline, index) => (
          <div key={index} className="headline">
            <h3>{headline.title}</h3>
            <p>{headline.abstract}</p>
            <a href={headline.url} target="_blank" rel="noopener noreferrer">Read more</a>
          </div>
        ))}
      </div>
    </>
  );
};

export default Headlines;
