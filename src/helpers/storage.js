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
