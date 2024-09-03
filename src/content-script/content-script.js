document.addEventListener("mouseup", function () {
  const selectedText = window.getSelection().toString().trim();
  if (selectedText) {
    chrome.runtime.sendMessage({ type: "TEXT_SELECTED", text: selectedText });
  }
});

//Right click

chrome.runtime.onMessage.addListener((request) => {
  if (request.type === "SEND_TO_CHATGPT") {
    // Call your function to send the text to ChatGPT
    sendPromptToChatGPT(request.text);
  }
});

// storage
