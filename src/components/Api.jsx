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

  // Function to summarize the entire page content
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
    setTimeout(() => setCopyMessage(''), 2000);  // Clear the copy message after 2 seconds
  };

  return (
    <div>
      <div>
        <textarea
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Enter your prompt here"
          rows="5"
          cols="50"
        />
        <button onClick={handleUserInput} disabled={loading || !userInput}>
          {loading ? 'Processing...' : 'Send Prompt'}
        </button>
      </div>

      <button onClick={handleSummarize} disabled={loading}>
        {loading ? 'Summarizing...' : 'Summarize Page'}
      </button>

      {summary && (
        <div>
          <h2>Summary</h2>
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
    </div>
  );
};

export default Summarizer;
