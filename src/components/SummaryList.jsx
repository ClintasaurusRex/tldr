
import React, { useEffect, useState } from 'react';
import { getSummaries } from '../helpers/storage';

const SummaryList = () => {
  const [summaries, setSummaries] = useState({});

  useEffect(() => {
    getSummaries().then((items) => {
      setSummaries(items);
    }).catch((error) => {
      console.error('Error retrieving summaries:', error);
    });
  }, []);

  return (
    <div className="summary-list">
      <h2>Saved Summaries</h2>
      {Object.keys(summaries).length === 0 ? (
        <p>No summaries available.</p>
      ) : (
        <ul>
          {Object.entries(summaries).map(([url, summary]) => (
            <li key={url}>
              <h3>{url}</h3>
              <p>{summary}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SummaryList;
