import { useState } from "react";
import useFontSize from "../helpers/useFontSize.js";
import useSavedSummaries from "../helpers/useSavedSummaries.js";
import useSound from "../helpers/useSound";

import "./SummaryList.scss";

const SummaryList = () => {
  const { handleDelete, handleDeleteAll, summaries, downloadSummary, handleCopy, copiedSummaryId, updateTitle } =
    useSavedSummaries();
  const { fontSize } = useFontSize();
  const { playSound } = useSound(0.2);
  
  // Local state to track the title being edited
  const [editingTitleId, setEditingTitleId] = useState(null);
  const [newTitle, setNewTitle] = useState("");

  const handleEditClick = (id, currentTitle) => {
    setEditingTitleId(id);
    setNewTitle(currentTitle);  // Initialize with the current title
  };

  const handleSaveClick = (id) => {
    updateTitle(id, newTitle);  // Save the updated title
    setEditingTitleId(null);    // Exit edit mode
  };

  // Sort summaries by timestamp (newest first)
  const sortedSummaries = Object.values(summaries).sort((a, b) => b.timestamp - a.timestamp);

  return (
    <div className="summary-list" style={{ fontSize: fontSize }}>
      <div className="clear-all">
        <h2>Saved Summaries</h2>
        <button
          id="delete-all-btn"
          style={{ fontSize: fontSize }}
          onClick={() => {
            handleDeleteAll();
            playSound();
          }}
        >
          Delete All Summaries
        </button>
      </div>

      {sortedSummaries.length === 0 ? (
        <h2>No summaries available.</h2>
      ) : (
        <ul>
          {sortedSummaries.map(({ url, summary, id, title }) => (
            <li key={id}>
              {/* Editable Title Section */}
              {editingTitleId === id ? (
                <div>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    style={{ fontSize: fontSize }}
                  />
                  <button
                    onClick={() => handleSaveClick(id)}
                    style={{ fontSize: fontSize }}
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div>
                  <h3 id="summary-title" style={{ fontSize: fontSize }}>
                    {title || url} {/* Default to URL if title is not set */}
                  </h3>
                  <button
                    onClick={() => handleEditClick(id, title || url)}
                    style={{ fontSize: fontSize }}
                  >
                    Edit
                  </button>
                </div>
              )}

              <p id="summary-value" style={{ fontSize: fontSize }}>{summary}</p>
              <div className="saved-summary-btns">
                <button
                  id="summary-buttons"
                  style={{ fontSize: fontSize }}
                  onClick={() => {
                    handleDelete(id);
                    playSound();
                  }}
                >
                  Delete
                </button>
                <button
                  id="summary-buttons"
                  style={{ fontSize: fontSize }}
                  onClick={() => {
                    handleCopy(summary, id);
                    playSound();
                  }}
                >
                  Copy to Clipboard
                </button>
                <button
                  id="summary-buttons"
                  style={{ fontSize: fontSize }}
                  onClick={() => {
                    downloadSummary(url, summary);
                    playSound();
                  }}
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
