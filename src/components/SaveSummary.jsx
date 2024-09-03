import { useState } from "react";

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
          console.log('Summary saved successfully');
          // You could update the component state here to indicate successful save
        } else {
          console.log('Failed to save summary');
          // You could update the component state here to indicate failed save
        }
      });
    });
  };


  return (
    <div>
      <button onClick={handleSaveSummary} >
        Save Summary
      </button>
    </div>

  );
}


export default SaveSummary;