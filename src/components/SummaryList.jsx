import useFontSize from "../helpers/useFontSize.js";
import useSavedSummaries from "../helpers/useSavedSummaries.js";

import "./SummaryList.scss";

const SummaryList = () => {
  const { handleDelete, summaries, downloadSummary, handleCopy, copiedSummaryId } =
    useSavedSummaries();

  const { fontSize } = useFontSize();

  return (
    <div className="summary-list" style={{ fontSize: fontSize }}>
      <h2>Saved Summaries</h2>
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
                  onClick={() => handleDelete(id)}
                >
                  Delete
                </button>
                <button
                  id="summary-buttons"
                  style={{ fontSize: fontSize }}
                  onClick={() => handleCopy(summary, id)}
                >
                  Copy to Clipboard
                </button>
                <button
                  id="summary-buttons"
                  style={{ fontSize: fontSize }}
                  onClick={() => downloadSummary(url, summary)}
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
