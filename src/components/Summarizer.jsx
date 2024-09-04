import React, { useState } from 'react';
import useOpenAISummarizer from '../helpers/aiSummarizer.js';
import { copyToClipboard, executeScriptInTab } from '../helpers/colinho.js';
import SummarizeBtns from './SummarizeBtns.jsx';
import DisplaySummary from './DisplaySummary.jsx';
import UserInput from './UserInput.jsx';
import ResponseApi from './ResponseApi.jsx';

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

  // Handle summarization of the highlighted text
  const handleSummarizeSelection = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript(
        {
          target: { tabId: tabs[0].id },
          func: () => window.getSelection().toString().trim(), // Get the highlighted text
        },
        (results) => {
          if (results && results[0] && results[0].result) {
            summarizeContent(results[0].result); // Summarize the highlighted text
          } else {
            console.error('No text selected.');
          }
        }
      );
    });
  };


  // Function to summarize the entire page content using Chrome APIs
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
      <SummarizeBtns
        handleSummarizeSelection={handleSummarizeSelection}
        handleSummarizeEntirePageWithChrome={handleSummarizeEntirePageWithChrome}
        loading={loading}
      />
      {summary && (
        <DisplaySummary
          summary={summary}
          handleRewrite={handleRewrite}
          loading={loading}
          copyMessage={copyMessage}
          setCopyMessage={setCopyMessage}
        />
      )}
      {responseText && (
        <ResponseApi
          responseText={responseText}
        />
      )}
      <UserInput
        userInput={userInput}
        setUserInput={setUserInput}
        handleUserInput={handleUserInput}
        loading={loading}
      />
    </div>
  );
};

export default Summarizer;
