import React, { useEffect, useState } from 'react';
import { getSummaries, deleteSummary } from '../helpers/storage';
import useSummarizer from '../helpers/useSummarizer.js';
import { copyToClipboard } from '../helpers/colinho';
import './SummaryList.scss';

const SummaryList = () => {
  const [summaries, setSummaries] = useState({});

  const {
    copyMessage,
    setCopyMessage
  } = useSummarizer();

  useEffect(() => {
    fetchSummaries();
  }, []);

  const fetchSummaries = () => {
    getSummaries().then((items) => {
      setSummaries(items);
    }).catch((error) => {
      console.error('Error retrieving summaries:', error);
    });
  };

  const handleDelete = (url) => {
    deleteSummary(url).then(() => {
      fetchSummaries(); // Refresh the summaries after deletion
    }).catch((error) => {
      console.error('Error deleting summary:', error);
    });
  };

  return (
    <div className="summary-list">
      <h2>Saved Summaries</h2>
      {Object.keys(summaries).length === 0 ? (
        <h2>No summaries available.</h2>
      ) : (
        <ul>
          {Object.entries(summaries).map(([url, summary]) => (
            <li key={url}>
              <h3>{url}</h3>
              <p>{summary}</p>
              <div className='saved-summary-btns'>
                <button onClick={() => handleDelete(url)}>Delete</button>
                <button onClick={() => copyToClipboard(summary, setCopyMessage)}>
                  Copy to Clipboard
                </button>
              </div>
              {copyMessage && <div className="copy-message">{copyMessage}</div>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SummaryList;
