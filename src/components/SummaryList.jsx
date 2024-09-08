import React, { useEffect, useState } from 'react';
import useSavedSummaries from '../helpers/useSavedSummaries.js';
import useSummarizer from '../helpers/useSummarizer.js';
import useDarkMode from '../helpers/useDarkMode';
import { copyToClipboard } from '../helpers/colinho';
import './SummaryList.scss';

const SummaryList = () => {
  const {
    handleDelete,
    summaries,
    downloadSummary
  } = useSavedSummaries(); // Import the new downloadSummary function

  const {
    copyMessage,
    setCopyMessage
  } = useSummarizer();

  const { darkMode } = useDarkMode();

  return (
    <div className={`summary-list ${darkMode ? 'dark-mode' : ''}`}>
      <h2>Saved Summaries</h2>
      {Object.keys(summaries).length === 0 ? (
        <h2>No summaries available.</h2>
      ) : (
        <ul>
          {Object.values(summaries).map(({ url, summary, id }) => (
            <li key={url}>
              <h3 id='summary-url'>{url}</h3>
              <p>{summary}</p>
              <div className='saved-summary-btns'>
                <button onClick={() => handleDelete(id)}>Delete</button>
                <button onClick={() => copyToClipboard(summary, setCopyMessage)}>
                  Copy to Clipboard
                </button>
                <button onClick={() => downloadSummary(url, summary)}>
                  Download
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