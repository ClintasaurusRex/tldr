export const copyToClipboard = (text, setCopyMessage) => {
    navigator.clipboard.writeText(text);
    setCopyMessage("Copied to clipboard!");
    setTimeout(() => setCopyMessage(''), 2000);  // Clear the copy message after 2 seconds
  };
  
  export const executeScriptInTab = (func, callback) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript(
        {
          target: { tabId: tabs[0].id },
          func,
        },
        (results) => {
          if (results && results[0] && results[0].result) {
            callback(results[0].result);
          }
        }
      );
    });
  };
  