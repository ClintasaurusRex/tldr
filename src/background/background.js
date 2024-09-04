/* eslint-disable func-style */
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  let selectedText = ""; // Initialize selectedText within the closure

  if (message.type === "TEXT_SELECTED") {
    selectedText = message.text;
  } else if (message.type === "GET_SELECTED_TEXT") {
    sendResponse({ text: selectedText });
  } else if (message.action === "saveSummary") {
    chrome.storage.local.set({ [message.url]: message.summary }, () => {
      console.log("Summary is Saved");
      sendResponse({ success: true, summary: message.summary });
    });
  } else {
    sendResponse({ success: false, message: "Unknown action" });
  }
  return true;
});

chrome.runtime.onInstalled.addListener(() => {
  console.log("Content Summarizer Extension Installed");

  chrome.contextMenus.create({
    id: "sendToChatGPT",
    title: "Send to the extension",
    contexts: ["selection"],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "sendToChatGPT") {
    chrome.storage.local.set(
      { selectedTextForChatGPT: info.selectionText },
      () => {
        chrome.action.openPopup();
      }
    );
  }
});

function cleanup() {
  chrome.contextMenus.removeAll();
  chrome.runtime.onMessage.removeListener();
}

chrome.runtime.onSuspend.addListener(() => {
  cleanup();
});
