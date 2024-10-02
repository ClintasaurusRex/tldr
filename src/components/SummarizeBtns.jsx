import "./SummarizeBtns.scss";
import useFontSize from "../helpers/useFontSize";
import { useEffect, useState } from "react";

const SummarizeBtns = function (props) {
  const { handleSummarizeSelection, handleSummarizeEntirePageWithChrome, loading } = props;
  const { fontSize } = useFontSize();

  const [summaryLength, setSummaryLength] = useState(
    localStorage.getItem("summaryLength") || "short"
  ); // added trying to get the summary length to work

  useEffect(() => {
    const storedSummaryLength = localStorage.getItem("summaryLength");
    if (storedSummaryLength) {
      setSummaryLength(storedSummaryLength);
    }
  }, []); // added trying to get the summary length to work

  return (
    <div className="summarize-btns">
      {/* Button to Summarize Highlighted Text */}
      <button
        style={{ fontSize: fontSize }}
        onClick={() => handleSummarizeSelection(summaryLength)}
        disabled={loading}
      >
        {loading ? "Summarizing Selection..." : "Summarize Selection"}
      </button>

      {/* Button to Summarize the Entire Page */}
      <button
        style={{ fontSize: fontSize }}
        onClick={handleSummarizeEntirePageWithChrome}
        disabled={loading}
      >
        {loading ? "Summarizing Entire Page..." : "Summarize Entire Page"}
      </button>
    </div>
  );
};

export default SummarizeBtns;
