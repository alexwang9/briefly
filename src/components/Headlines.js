import React, {useEffect, useState} from 'react';
import axios from 'axios';
import '../App.css';

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
      <div className="Headlines-section">
        <h2 className="headlines-header">recent headlines</h2>
        <div className="headlines">
          {headlines.map((headline, index) => (
            <div key={index} className="headline">
              <a href={headline.url} target="_blank" rel="noopener noreferrer" className="headline-title"><em>{headline.title}</em></a>
              <p className="headline-abstract">{headline.abstract}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
//<p>{headline.abstract}</p>
export default Headlines;
