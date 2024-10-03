import useFontSize from "../helpers/useFontSize.js";
import useSavedSummaries from "../helpers/useSavedSummaries.js";
import useSound from '../helpers/useSound'; 

import "./SummaryList.scss";

const SummaryList = () => {
  const { handleDelete, handleDeleteAll, summaries, downloadSummary, handleCopy, copiedSummaryId } = 
    useSavedSummaries();
  const { fontSize } = useFontSize();
  const { playSound } = useSound(0.2); 

  return (
    <div className="summary-list" style={{ fontSize: fontSize }}>
      <h2>Saved Summaries</h2>

      {/* Button to clear all summaries */}
      <div className="clear-all">
        <button
          style={{ fontSize: fontSize }}
          onClick={() => { handleDeleteAll(); playSound(); }}  // Call handleDeleteAll on click
        >
          Delete All Summaries
        </button>
      </div>

      {Object.keys(summaries).length === 0 ? (
        <h2>No summaries available.</h2>
      ) : (
        <ul>
          {Object.values(summaries).map(({ url, summary, id }) => (
            <li key={url}>
              <h3 id="summary-url">{url}</h3>
              <p id="summary-value">{summary}</p>
              <div className="saved-summary-btns">
                <button
                  id="summary-buttons"
                  style={{ fontSize: fontSize }}
                  onClick={() => { handleDelete(id); playSound(); }} 
                >
                  Delete
                </button>
                <button
                  id="summary-buttons"
                  style={{ fontSize: fontSize }}
                  onClick={() => { handleCopy(summary, id); playSound(); }}  
                >
                  Copy to Clipboard
                </button>
                <button
                  id="summary-buttons"
                  style={{ fontSize: fontSize }}
                  onClick={() => { downloadSummary(url, summary); playSound(); }} 
                >
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
