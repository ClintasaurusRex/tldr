import { useState, useEffect } from "react";

function SaveSummary() {
  const [summaryText, setSummaryText] = useState("");


  const handleSaveSummary = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      let currentUrl = tabs[0].url;
      console.log(currentUrl);

      chrome.runtime.sendMessage({
        action: 'saveSummary',
        url: currentUrl,
        summary: summaryText
      }, function (response) {
        if (response.success) {
          console.log('Summary saved successfully', setSummaryText);
        } else {
          console.log('Failed to save summary');
        }
      });
    });
  };

  return (
    <div>
      <button onClick={handleSaveSummary}>
        Save Summary
      </button>
    </div>
  );
}

export default SaveSummary;