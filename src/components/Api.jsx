import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config';
import { handleRewrite, handleSummarize, handleCopy } from '../helpers/helpers';

const Summarizer = (props) => {


  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [rewrite, setRewrite] = useState(false);
  const [copyMessage, setCopyMessage] = useState('');

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
          <button
            onClick={handleCopy}>
            Copy to Clipboard
          </button>
          {copyMessage && <p>{copyMessage}</p>}
        </div>
      )}
    </div>
  );
};

export default Summarizer;
