/* eslint-disable func-style */

// Fetch all summaries from local storage
export const getSummaries = () => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(null, (items) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        // Convert string summaries to object format if needed
        const fixedItems = Object.keys(items).reduce((acc, key) => {
          let summaryData = items[key];

          // If the summary is a string, convert it to an object
          if (typeof summaryData === 'string') {
            summaryData = {
              summary: summaryData,
              createdAt: Date.now(), // Use current time for legacy summaries
            };
          }

          acc[key] = summaryData;
          return acc;
        }, {});

        resolve(fixedItems); // Return the updated summaries
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
    const timestampedData = { ...summaryData, createdAt: Date.now() }; // Add timestamp
    chrome.storage.sync.set({ [id]: timestampedData }, function () {
      if (chrome.runtime.lastError) {
        return reject(chrome.runtime.lastError);
      }
      resolve();
    });
  });
};
