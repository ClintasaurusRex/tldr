console.log("inside the content script");
console.log(document.body);

document.addEventListener("mouseup", function () {
  const selectedText = window.getSelection().toString().trim();
  if (selectedText) {
    chrome.runtime.sendMessage({ type: "TEXT_SELECTED", text: selectedText });
  }
});


// aliababa