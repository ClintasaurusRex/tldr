import React, { useState } from "react";
import "./SummarizeBtns.scss";
import useFontSize from "../helpers/useFontSize";
import useSound from "../helpers/useSound";

const SummarizeBtns = function (props) {
  const { handleSummarizeSelection, handleSummarizeEntirePageWithChrome, loading } = props;
  const { fontSize } = useFontSize();
  const { playSound } = useSound(0.2);

  // State to track the number of clicks for each button
  const [selectionClickCount, setSelectionClickCount] = useState(0);
  const [pageClickCount, setPageClickCount] = useState(0);

  const handleSelectionClick = () => {
    const newCount = selectionClickCount + 1;
    setSelectionClickCount(newCount);

    if (newCount % 2 === 0) {
      alert("Thank you for using our service! Consider making a donation to support us.");
      setSelectionClickCount(0); // Reset the count after every two clicks
      return; // Exit the function to prevent summarization
    }

    handleSummarizeSelection();
    playSound();
  };

  const handlePageClick = () => {
    const newCount = pageClickCount + 1;
    setPageClickCount(newCount);

    if (newCount % 2 === 0) {
      alert("Thank you for using our service! Consider making a donation to support us.");
      setPageClickCount(0); // Reset the count after every two clicks
      return; // Exit the function to prevent summarization
    }

    handleSummarizeEntirePageWithChrome();
    playSound();
  };

  return (
    <div className="summarize-btns">
      {/* Button to Summarize Highlighted Text */}
      <button style={{ fontSize: fontSize }} onClick={handleSelectionClick} disabled={loading}>
        {loading ? "Summarizing Selection..." : "Summarize Selection"}
      </button>

      {/* Button to Summarize the Entire Page */}
      <button style={{ fontSize: fontSize }} onClick={handlePageClick} disabled={loading}>
        {loading ? "Summarizing Entire Page..." : "Summarize Entire Page"}
      </button>
    </div>
  );
};

export default SummarizeBtns;
