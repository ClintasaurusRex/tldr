import React, { useState } from 'react';
import axios from 'axios';
import config from '../config';

const Summarizer = () => {
  const [summary, setSummary] = useState('');
  const [responseText, setResponseText] = useState('');
  const [loading, setLoading] = useState(false);
  const [rewrite, setRewrite] = useState(false);
  const [copyMessage, setCopyMessage] = useState('');
  const [userInput, setUserInput] = useState('');  // State to hold user input

  // Function to summarize text from the page or user input
  const summarizeContent = async (text) => {
    setLoading(true);
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content: 'You are a helpful assistant that summarizes articles.',
            },
            {
              role: 'user',
              content: `Please summarize the following text: ${text}`,
            },
          ],
          max_tokens: 150,
        },
        {
          headers: {
            Authorization: `Bearer ${config.API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        let currentUrl = tabs[0].url;
        console.log(currentUrl);

        chrome.runtime.sendMessage({
          action: 'saveSummary',
          url: currentUrl,
          summary: response.data.choices[0].message.content
        }, function (response) {
          if (response.success) {
            console.log('Summary saved successfully', response);
          } else {
            console.log('Failed to save summary');
          }
        });
      });

      setSummary(response.data.choices[0].message.content);
    } catch (error) {
      console.error('Error fetching the summary:', error);
    } finally {
      setLoading(false);
      setRewrite(false);
    }
  };

  // Function to handle the rewrite action
  const handleRewrite = () => {
    setRewrite(true);
    summarizeContent(summary);
  };

  // Function to summarize the highlighted content
  const handleSummarize = () => {
    const text = document.body.innerText; // Extract text from the page
    summarizeContent(text);
  };

  // Function to send a custom prompt to ChatGPT
  const sendPromptToChatGPT = async (prompt) => {
    setLoading(true);
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content: 'You are a helpful assistant.',
            },
            {
              role: 'user',
              content: prompt,
            },

          ],
          max_tokens: 150,
        },
        {
          headers: {
            Authorization: `Bearer ${config.API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      setResponseText(response.data.choices[0].message.content);
    } catch (error) {
      console.error('Error fetching the response:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle user input for sending a prompt
  const handleUserInput = () => {
    sendPromptToChatGPT(userInput);
  };

  // Function to copy summary or response text to clipboard
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopyMessage("Copied to clipboard!");
    console.log("Copied to clipboard", text);
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
      <button onClick={handleSummarize} disabled={loading}>
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
          <button onClick={() => handleRewrite()} disabled={loading}>
            {loading ? 'Rewriting...' : 'Rewrite'}
          </button>
          <button onClick={() => handleCopy(summary)}>
            Copy to Clipboard
          </button>
        </div>
      )}

      {responseText && (
        <div>
          <h2>Response</h2>
          <p>{responseText}</p>
          <button onClick={() => handleCopy(responseText)}>
            Copy to Clipboard
          </button>
          {copyMessage && <p>{copyMessage}</p>}
        </div>
      )}
      <section className='text-area'>
        <textarea id="text-input"
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
