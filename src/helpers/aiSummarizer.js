import { useState } from "react";
import axios from "axios";
import config from "../config";

const useOpenAISummarizer = () => {
  const [summary, setSummary] = useState("");
  const [responseText, setResponseText] = useState("");
  const [loading, setLoading] = useState(false);

  const summarizeContent = async (text, summaryLength = "medium") => {
    setLoading(true);
    let prompt;
    let maxTokens;
    let wordLimit;

    switch (summaryLength) {
      case "short":
        prompt = `Please summarize the following text in no more than 25 words: ${text}`;
        maxTokens = 50;
        wordLimit = 25;
        break;
      case "medium":
        prompt = `Please summarize the following text in no more than 100 words: ${text}`;
        maxTokens = 150;
        wordLimit = 100;
        break;
      case "long":
        prompt = `Please summarize the following text in no more than 200 words: ${text}`;
        maxTokens = 300;
        wordLimit = 200;
        break;
      default:
        prompt = `Please summarize the following text: ${text}`;
        maxTokens = 150;
        wordLimit = 100;
    }

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4",
          messages: [
            {
              role: "system",
              content: "You are a helpful assistant that summarizes articles.",
            },
            {
              role: "user",
              content: prompt,
            },
          ],
          // `Please summarize the following text: ${text}`
          max_tokens: maxTokens,
        },
        {
          headers: {
            Authorization: `Bearer ${config.API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      let summaryText = response.data.choices[0].message.content;

      // Post-process the summary to enforce the word limit
      const words = summaryText.split(" ");
      if (words.length > wordLimit) {
        summaryText = words.slice(0, wordLimit).join(" ") + "...";
      }

      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        let currentUrl = tabs[0].url;

        chrome.runtime.sendMessage(
          {
            action: "saveSummary",
            url: currentUrl,
            summary: summaryText,
          },
          function (response) {
            if (response.success) {
              console.log("Summary saved successfully", response);
            } else {
              console.log("Failed to save summary");
            }
          }
        );
      });

      setSummary(summaryText);
    } catch (error) {
      console.error("Error fetching the summary:", error);
    } finally {
      setLoading(false);
    }
  };

  const sendPromptToChatGPT = async (prompt, maxTokens = 150) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4", // model: "gpt-4o-2024-08-06"
          messages: [
            {
              role: "system",
              content: "You are a helpful assistant that summarizes articles.",
            },
            {
              role: "user",
              content: `Please summarize the following text: ${prompt}`,
            },
          ],
          max_tokens: 1500, // changed this
        },
        {
          headers: {
            Authorization: `Bearer ${config.API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );
      setResponseText(response.data.choices[0].message.content);
    } catch (error) {
      console.error("Error fetching the summary:", error);
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
