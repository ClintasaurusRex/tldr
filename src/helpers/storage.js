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

// Listen for changes in the storage
chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === "local") {
    for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
      console.log(
        `Storage key "${key}" in namespace "${areaName}" changed.`,
        `Old value was "${oldValue}", new value is "${newValue}".`
      );
      // You can add additional logic here to update your extension's UI
      // For example, you can call a function to refresh the displayed summaries
      refreshSummaries();
    }
  }
});

// Function to refresh summaries (you need to implement this based on your UI logic)
function refreshSummaries() {
  getSummaries().then((summaries) => {
    // Update your UI with the new summaries
    console.log("Updated summaries:", summaries);
    // Add your UI update logic here
  });
}
