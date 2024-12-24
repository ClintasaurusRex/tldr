import useFontSize from "../helpers/useFontSize.js";
import useSavedSummaries from "../helpers/useSavedSummaries.js";
import useSound from "../helpers/useSound";
import { useState, useEffect } from "react";

import "./SummaryList.scss";

const SummaryList = () => {
  const {
    handleDelete,
    handleDeleteAll,
    summaries,
    downloadSummary,
    handleCopy,
    copiedSummaryId,
    updateTitle,
  } = useSavedSummaries();
  const { fontSize } = useFontSize();
  const { playSound } = useSound(0.2);

  const [editingTitleId, setEditingTitleId] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [showLimitPopup, setShowLimitPopup] = useState(false); // Summary list pop up message telling user to download or delete

  // Summary list pop up message telling user to download or delete
  const checkSummaryCount = () => {
    const summaryCount = Object.keys(summaries).length;
    if (summaryCount === 15 && !showLimitPopup) {
      setShowLimitPopup(true);
    }
  };

  useEffect(() => {
    checkSummaryCount();
  }, [summaries]);

  const handleEditClick = (id, currentTitle) => {
    setEditingTitleId(id);
    setNewTitle(currentTitle); // Initialize with the current title or empty string
    playSound();
  };

  const handleSaveTitleClick = (id) => {
    updateTitle(id, newTitle); // Save the new title
    setEditingTitleId(null); // Exit edit mode
    playSound();
  };

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

      {Object.keys(summaries).length === 0 ? (
        <h2>No summaries available.</h2>
      ) : (
        <ul>
          {Object.keys(summaries).map((id) => {
            const { url, summary, title = "" } = summaries[id]; // Extract title if available

            return (
              <li key={id}>
                <div className="summary-header">
                  {editingTitleId === id ? (
                    <>
                      <input
                        className="edit-title-input"
                        type="text"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        style={{ fontSize: fontSize }}
                      />
                      <button
                        className="save-title-btn"
                        onClick={() => handleSaveTitleClick(id)}
                        style={{ fontSize: fontSize }}
                      >
                        Save
                      </button>
                    </>
                  ) : (
                    <>
                      <h3 id="summary-title" style={{ fontSize: fontSize }}>
                        {title || url}
                      </h3>
                      <button
                        className="edit-title-btn"
                        onClick={() => handleEditClick(id, title || url)}
                        style={{ fontSize: fontSize }}
                      >
                        Edit
                      </button>
                    </>
                  )}
                </div>

                <p id="summary-value" style={{ fontSize: fontSize }}>
                  {summary}
                </p>
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
                      downloadSummary(id, { url, title, summary });
                      playSound();
                    }}
                  >
                    Download
                  </button>
                </div>
                {showLimitPopup && (
                  <div className="popup-message">
                    <p>
                      You have reached 15 saved summaries! Please downlaod and delete to make room.
                    </p>
                    <button
                      className="popup-message-button"
                      onClick={() => setShowLimitPopup(false)}
                      style={{ fontSize: fontSize }}
                    >
                      Close
                    </button>
                  </div>
                )}
                {copiedSummaryId === id && <div className="copy-message">Copied!</div>}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default SummaryList;
