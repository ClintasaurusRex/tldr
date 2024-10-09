/* eslint-disable func-style */

(function () {
  // this is an IIFE (google if needed)
  // Declare the variable to store selected text within the IIFE
  let selectedText = "";

  // Listener for messages sent from other parts of the extension
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "TEXT_SELECTED") {
      // Store the selected text
      selectedText = message.text;
    } else if (message.type === "GET_SELECTED_TEXT") {
      // Respond with the stored selected text
      sendResponse({ text: selectedText });
    } else if (message.action === "saveSummary") {
      // Save the summary to local storage with the URL as the key
      const newId = generateRandomId();
      chrome.storage.local.set(
        { [newId]: { summary: message.summary, id: newId, url: message.url } },
        () => {
          sendResponse({ success: true, summary: message.summary });
        }
      );
    } else {
      // Handle unknown actions
      sendResponse({ success: false, message: "Unknown action" });
    }
    return true; // Indicates that the response will be sent asynchronously
  });

  function generateRandomId() {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    const charactersLength = characters.length;

    for (let i = 0; i < 12; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }

  // Example usage
  const randomId = generateRandomId(10); // Generates a random ID with a length of 10
  console.log(randomId);

  // Listener for when the extension is installed
  chrome.runtime.onInstalled.addListener(() => {
    console.log("Content Summarizer Extension Installed");

    // Create a context menu item for text selection
    chrome.contextMenus.create({
      id: "sendToChatGPT",
      title: "Send to TLDR 🚀",
      contexts: ["selection"],
    });
  });

  // Listener for context menu item clicks
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "sendToChatGPT") {
      // Store the selected text and open the extension popup
      chrome.storage.local.set(
        { selectedTextForAI: info.selectionText },
        () => {
          chrome.action.openPopup();
        }
      );
    }
  });

  // Function to reload the background script
  function reloadBackgroundScript() {
    chrome.runtime.reload();
  }

  // Example of how to use the reload function
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "RELOAD_BACKGROUND") {
      reloadBackgroundScript();
      sendResponse({ success: true });
    }
    return true; // Indicates that the response will be sent asynchronously
  });

  // Function to clean up context menus and message listeners
  function cleanup() {
    chrome.contextMenus.removeAll();
    chrome.runtime.onMessage.removeListener();
  }

  // Listener for when the extension is suspended
  chrome.runtime.onSuspend.addListener(() => {
    cleanup();
  });

  function injectContentScript(tabId) {
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: ["content-script/content-script.js"],
    });
  }

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    injectContentScript(tabs[0].id);
  });
})();


