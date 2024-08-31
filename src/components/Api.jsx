import React, { useState } from 'react';
import axios from 'axios';
import config from '../config';
import { set } from 'lodash';

const Summarizer = () => {
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [rewrite, setRewrite] = useState(false);

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
      console.error('Error fetching the summary!!!!!!:', error);
    } finally {
      setLoading(false);
      setRewrite(false);
    }
  };

  function handleRewrite() {
    setRewrite(true);
    const text = document.body.innerText;
    summarizeContent(summary, true);
  }
  const handleSummarize = () => {
    const text = document.body.innerText; // Extract text from the page
    summarizeContent(text);
  };

  return (
    <div>
      <button onClick={handleSummarize} disabled={loading}>
        {loading ? 'Summarizing...' : 'Summarize Page'}
      </button>
      {summary && (
        <div>
          <h2>Summary</h2>
          <p>{summary}</p>
          <button
            onClick={handleRewrite} disabled={loading}>
            {loading ? 'Rewriting...' : 'Rewrite'}
          </button>
        </div>
      )}
    </div>
  );
};

export default Summarizer;
