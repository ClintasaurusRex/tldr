import React, { useState, useEffect } from "react";
import SummarizeBtns from "./SummarizeBtns.jsx";
import DisplaySummary from "./DisplaySummary.jsx";
import UserInput from "./UserInput.jsx";
import ResponseApi from "./ResponseApi.jsx";
import useSummarizer from "../helpers/useSummarizer.js";
import useFontSize from "../helpers/useFontSize.js";

const Summarizer = () => {
  const {
    handleRewrite,
    handleSummarizeSelection,
    handleSummarizeEntirePageWithChrome,
    handleUserInput,
    summary,
    responseText,
    loading,
    copyMessage,
    userInput,
    setUserInput,
    setCopyMessage,
    summaryLength,
  } = useSummarizer();

  const { fontSize } = useFontSize();

  // const [summaryLength, setSummaryLength] = useState(
  //   localStorage.getItem("summaryLength") || "medium"
  // );

  // useEffect(() => {
  //   const storedSummaryLength = localStorage.getItem("summaryLength");
  //   if (storedSummaryLength) {
  //     setSummaryLength(storedSummaryLength);
  //   }
  // }, []);

  return (
    <div style={{ fontSize: fontSize }}>
      <SummarizeBtns
        handleSummarizeSelection={() => handleSummarizeSelection(summaryLength)}
        handleSummarizeEntirePageWithChrome={() =>
          handleSummarizeEntirePageWithChrome(summaryLength)
        }
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

      {responseText && <ResponseApi responseText={responseText} />}

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
