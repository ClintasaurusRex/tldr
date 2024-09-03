import { useState } from 'react';
import axios from 'axios';
import config from '../config';

const useOpenAISummarizer = () => {
  const [summary, setSummary] = useState('');
  const [responseText, setResponseText] = useState('');
  const [loading, setLoading] = useState(false);

  const summarizeContent = async (text, maxTokens = 150) => {
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
          max_tokens: maxTokens,
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
    }
  };

  const sendPromptToChatGPT = async (prompt, maxTokens = 150) => {
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
          max_tokens: maxTokens,
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

  return {
    summary,
    responseText,
    loading,
    summarizeContent,
    sendPromptToChatGPT,
  };
};

export default useOpenAISummarizer;