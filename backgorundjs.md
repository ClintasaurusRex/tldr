```js
// import config from "../config";

/* eslint-disable func-style */
chrome.runtime.onInstalled.addListener(() => {
  console.log("Content Summarizer Extension Installed");
});

chrome.action.onClicked.addListener((tab) => {
  console.log("ICON CLICKED!!!!!!!");
  summarizeContent();
});

async function summarizeContent() {
  console.log("HEEEEEELLLLLLOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO");
  const apiKey = "No api key here";
  const text = "i have a love for the color hot pink";

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that summarizes articles.",
        },
        {
          role: "user",
          content: `Please summarize the following text: ${text}`,
        },
      ],
      max_tokens: 150,
    }),
  });

  const data = await response.json();
  console.log("Summary: ", data);
}

let selectedText = ""; // this needs to change

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "TEXT_SELECTED") {
    selectedText = message.text;
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "GET_SELECTED_TEXT") {
    sendResponse({ text: selectedText });
  }
});

// Right click

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "sendToChatGPT",
    title: "Send to the extension",
    contexts: ["selection"],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "sendToChatGPT") {
    chrome.storage.local.set(
      // { selectedTextForChatGPT: info.selectionText },
      () => {
        chrome.action.openPopup();
      }
    );
  }
});

// storage
// Save the summary
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "saveSummary") {
    chrome.storage.local.set({ [request.url]: request.summary }, () => {
      console.log("Summary saved");
      sendResponse({ success: true, summary: request.summary });
    });
  }
  return true;
});
```