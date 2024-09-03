import React, { useState } from 'react';
import useOpenAISummarizer from '../helpers/aiSummarizer.js'; // Adjust the path based on where the file is located
import { copyToClipboard, executeScriptInTab } from '../helpers/colinho.js';


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

  // Handle summarization of the entire page content (Renamed this function to avoid conflict)
  const handleSummarizePageContent = () => {
    executeScriptInTab(
      () => document.body.innerText,
      (text) => summarizeContent(text)
    );
  };

  // Function to summarize the entire page content using Chrome APIs (Renamed to avoid conflict)
  const handleSummarizeEntirePageWithChrome = () => {
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

  // Handle user input for sending a prompt
  const handleUserInput = () => {
    sendPromptToChatGPT(userInput);
  };

  return (
    <div>
      {/* Original Summarize Button */}
      <button onClick={handleRewrite} disabled={loading}>
        {loading ? 'Summarizing...' : 'Summarize Page'}
      </button>

      {/* New Button to Summarize the Entire Page */}
      <button onClick={handleSummarizeEntirePageWithChrome} disabled={loading}>
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
