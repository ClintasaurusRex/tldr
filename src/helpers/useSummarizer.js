import useOpenAISummarizer from "./aiSummarizer.js";
import React, { useState, useEffect } from "react";

const useSummarizer = function () {
  const { summary, responseText, loading, summarizeContent, sendPromptToChatGPT } =
    useOpenAISummarizer();
  const [rewrite, setRewrite] = useState(false);
  const [copyMessage, setCopyMessage] = useState("");
  const [userInput, setUserInput] = useState(""); // State to hold user input

  const [summaryLength, setSummaryLength] = useState(
    localStorage.getItem("summaryLength") || "short"
  );

  const handleSummaryLengthChange = (event) => {
    setSummaryLength(event.target.value);
    console.log("Summary length set to:", event.target.value);
  };

  // Handle the rewrite action
  const handleRewrite = () => {
    setRewrite(true);
    summarizeContent(summary, summaryLength);
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
            summarizeContent(results[0].result, summaryLength); // Summarize the highlighted text
            console.log("summary length", summaryLength);
          } else {
            console.error("No text selected.");
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

  // Event listener for Enter key press in the textarea
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Enter" && !event.shiftKey && !loading && userInput) {
        event.preventDefault();
        handleUserInput();
      }
    };

    const textarea = document.getElementById("text-input");
    if (textarea) {
      textarea.addEventListener("keypress", handleKeyPress);
      return () => {
        textarea.removeEventListener("keypress", handleKeyPress);
      };
    }
  }, [loading, userInput, handleUserInput]);

  return {
    handleRewrite,
    handleSummarizeSelection,
    handleSummarizeEntirePageWithChrome,
    handleUserInput,
    summary,
    responseText,
    loading,
    summarizeContent,
    sendPromptToChatGPT,
    rewrite,
    copyMessage,
    userInput,
    setUserInput,
    setCopyMessage,
    summaryLength,
    setSummaryLength,
    handleSummaryLengthChange,
  };
};

export default useSummarizer;
