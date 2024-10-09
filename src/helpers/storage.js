/* eslint-disable func-style */

// Fetch all summaries from local storage
export const getSummaries = () => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(null, (items) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve(items); // Returns all items in local storage
      }
    });
  });
};

// Delete a specific summary from local storage by URL (used as the key)
export const deleteSummary = (url) => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.remove(url, () => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve(); // Confirms that the item was removed
      }
    });
  });
};

// Listen for changes in storage (triggered by other components)
export const onStorageChange = (callback) => {
  const listener = (changes, areaName) => {
    if (areaName === "local") {
      callback(changes);
    }
  };

  chrome.storage.onChanged.addListener(listener);

  // Return a function to remove the listener (cleanup)
  return () => {
    chrome.storage.onChanged.removeListener(listener);
  };
};

// Save summary and title in local storage (stores an object as the value)
export const saveSummary = (id, summaryData) => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.set({ [id]: summaryData }, function () {
      if (chrome.runtime.lastError) {
        return reject(chrome.runtime.lastError);
      }
      resolve(); // Confirms that the summaryData was saved
    });
  });
};
