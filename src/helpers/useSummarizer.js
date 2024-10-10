import useOpenAISummarizer from "./aiSummarizer.js";
import { useState, useEffect } from "react";

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
    localItem("summaryLength", event.target.value);
    setSummaryLength(event.target.value);
    console.log("Summary length set to:", event.target.value);
  };

  // Handle the rewrite action
  const handleRewrite = () => {
    setRewrite(true);
    const currentSummaryLength = localStorage.getItem("summaryLength");
    summarizeContent(summary, currentSummaryLength);
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
            const selectedText = results[0].result;
            // Access the latest summaryLength
            const currentSummaryLength = localStorage.getItem("summaryLength"); // got rid of state used storage
            summarizeContent(selectedText, currentSummaryLength); // Use the latest value of summaryLength
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
            const currentSummaryLength = localStorage.getItem("summaryLength" || "medium");
            summarizeContent(results[0].result, currentSummaryLength); // Summarize the extracted text
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

const handleSummarize = async () => {
  // ... existing summarization code ...

  const showDonationAlert = await incrementAndCheckUsageCount(10); // Set threshold to 10 uses
  if (showDonationAlert) {
    // Show donation alert
    alert(
      "You've used our summarizer 10 times! Please consider making a donation to support our work."
    );
    // You can also use a more sophisticated alert or modal here
  }
};
