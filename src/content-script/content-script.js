/* eslint-disable func-style */
document.addEventListener("mouseup", function () {
  const selectedText = window.getSelection().toString().trim();
  if (selectedText) {
    chrome.runtime.sendMessage({ type: "TEXT_SELECTED", text: selectedText });
  }
});

//Right click

chrome.runtime.onMessage.addListener((request) => {
  if (request.type === "SEND_TO_CHATGPT") {
    // Call your function to send the text to summarizer
    sendPromptToChatGPT(request.text);
  }
});

// function injectContentScript(tabId) {
//   chrome.scripting.executeScript({
//     target: { tabId: tabId },
//     files: ["content-script.js"],
//   });
// }

// chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//   injectContentScript(tabs[0].id);
// });
