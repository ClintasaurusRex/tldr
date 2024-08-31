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
