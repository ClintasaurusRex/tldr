import "./SummarizeBtns.scss";
import useFontSize from "../helpers/useFontSize";
import useSound from "../helpers/useSound"; 
import { useEffect, useState } from "react";
import useSummarizer from "../helpers/useSummarizer";

const SummarizeBtns = function (props) {
  const { handleSummarizeSelection, handleSummarizeEntirePageWithChrome, loading } = props;
  const { fontSize } = useFontSize();
  const { summaryLength } = useSummarizer();
  const { playSound } = useSound(0.2); 
  

  return (
    <div className="summarize-btns">
      {/* Button to Summarize Highlighted Text */}
      <button
        style={{ fontSize: fontSize }}
        onClick={() => { handleSummarizeSelection(); playSound(); }} 
        disabled={loading}
      >
        {loading ? "Summarizing Selection..." : "Summarize Selection"}
      </button>

      
      <button
        style={{ fontSize: fontSize }}
        onClick={() => { handleSummarizeEntirePageWithChrome(); playSound(); }} 
        disabled={loading}
      >
        {loading ? "Summarizing Entire Page..." : "Summarize Entire Page"}
      </button>
    </div>
  );
};

export default SummarizeBtns;
