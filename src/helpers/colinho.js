export const copyToClipboard = (text, setCopyMessage) => {
  navigator.clipboard.writeText(text);
  setCopyMessage("Copied to the clipboard !");
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
