import React, { useState } from 'react';
import useOpenAISummarizer from './useOpenAISummarizer';
import { copyToClipboard, executeScriptInTab } from './helpers';

const Summarizer = () => {
  const { summary, responseText, loading, summarizeContent, sendPromptToChatGPT } = useOpenAISummarizer();
  const [rewrite, setRewrite] = useState(false);
  const [copyMessage, setCopyMessage] = useState('');
  const [userInput, setUserInput] = useState('');  // State to hold user input

  // Handle the rewrite action
  const handleRewrite = () => {
    setRewrite(true);
    summarizeContent(summary);
  };

  // Handle summarization of the entire page content
  const handleSummarizeEntirePage = () => {
    executeScriptInTab(
      () => document.body.innerText,
      (text) => summarizeContent(text)
    );
  };

  // Handle user input for sending a prompt
  const handleUserInput = () => {
    sendPromptToChatGPT(userInput);
  };

  // Function to copy summary or response text to clipboard
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopyMessage("Copied to clipboard!");
    setTimeout(() => setCopyMessage(''), 2000);  // Clear the copy message after 2 seconds
  };

  // Function to summarize the entire page content (New Button)
  const handleSummarizeEntirePage = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript(
        {
          target: { tabId: tabs[0].id },
          func: () => document.body.innerText, // Extract text from the page
        },
        (results) => {
          if (results && results[0] && results[0].result) {
            summarizeContent(results[0].result); // Summarize the extracted text
          }
        }
      );
    });
  };

  return (
    <div>
      {/* Original Summarize Button */}
      <button onClick={handleRewrite} disabled={loading}>
        {loading ? 'Summarizing...' : 'Summarize Page'}
      </button>

      {/* New Button to Summarize the Entire Page */}
      <button onClick={handleSummarizeEntirePage} disabled={loading}>
        {loading ? 'Summarizing Entire Page...' : 'Summarize Entire Page'}
      </button>

      {summary && (
        <div>
          <h2>Summary</h2>
          <br />
          <p>{summary}</p>
          <button onClick={handleRewrite} disabled={loading}>
            {loading ? 'Rewriting...' : 'Rewrite'}
          </button>
          <button onClick={() => copyToClipboard(summary, setCopyMessage)}>
            Copy to Clipboard
          </button>
        </div>
      )}

      {responseText && (
        <div>
          <h2>Response</h2>
          <p>{responseText}</p>
          <button onClick={() => copyToClipboard(responseText, setCopyMessage)}>
            Copy to Clipboard
          </button>
          {copyMessage && <p>{copyMessage}</p>}
        </div>
      )}
      <section className='text-area'>
        <textarea
          id="text-input"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Enter your prompt here"
          rows="5"
          cols="50"
        />
        <button onClick={handleUserInput} disabled={loading || !userInput}>
          {loading ? 'Processing...' : 'Send Prompt'}
        </button>
      </section>
    </div>
  );
};

export default Summarizer;
