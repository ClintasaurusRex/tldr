/* eslint-disable func-style */
function handleRewrite() {
  setRewrite(true);
  const text = document.body.innerText;
  summarizeContent(summary, true);
}
const handleSummarize = () => {
  const text = document.body.innerText; // Extract text from the page
  summarizeContent(text);
};

const handleCopy = () => {
  navigator.clipboard.writeText(summary);
  setCopyMessage("Copied to clipboard!");
};

// export default { handleRewrite, handleSummarize, handleCopy };
