import React, { useState } from 'react';
import useSavedSummaries from '../helpers/useSavedSummaries.js';
import useSummarizer from '../helpers/useSummarizer.js';
import { copyToClipboard } from '../helpers/colinho';

import './SummaryList.scss';

const SummaryList = () => {
  const {
    handleDelete,
    summaries,
    downloadSummary
  } = useSavedSummaries();

  // Track which summary was copied
  const [copiedSummaryId, setCopiedSummaryId] = useState(null);

  const handleCopy = (summary, id) => {
    copyToClipboard(summary, () => setCopiedSummaryId(id)); 
    setTimeout(() => setCopiedSummaryId(null), 3000); 
  };

  return (
    <div className="summary-list">
      <h2>Saved Summaries</h2>
      {Object.keys(summaries).length === 0 ? (
        <h2>No summaries available.</h2>
      ) : (
        <ul>
          {Object.values(summaries).map(({ url, summary, id }) => (
            <li key={url}>
              <h3 id='summary-url'>{url}</h3>
              <p id='summary-value'>{summary}</p>
              <div className="saved-summary-btns">
                <button id="summary-buttons" onClick={() => handleDelete(id)}>
                  Delete
                </button>
                <button id="summary-buttons" onClick={() => handleCopy(summary, id)}>
                  Copy to Clipboard
                </button>
                <button id="summary-buttons" onClick={() => downloadSummary(url, summary)}>
                  Download
                </button>
              </div>
           
              {copiedSummaryId === id && <div className="copy-message">Copied!</div>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SummaryList;
