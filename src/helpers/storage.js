/* eslint-disable func-style */
export const getSummaries = () => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(null, (items) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve(items);
      }
    });
  });
};
// Passing null tells Chrome to get all items from the local storage.

export const deleteSummary = (url) => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.remove(url, () => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve();
      }
    });
  });
};

// New function to listen for storage changes
export const onStorageChange = (callback) => {
  chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName === "local") {
      callback(changes);
    }
  });
};
