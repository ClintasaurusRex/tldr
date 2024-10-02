import SummarizeBtns from "./SummarizeBtns.jsx";
import DisplaySummary from "./DisplaySummary.jsx";
import UserInput from "./UserInput.jsx";
import ResponseApi from "./ResponseApi.jsx";
import useSummarizer from "../helpers/useSummarizer.js";
import useFontSize from "../helpers/useFontSize.js";

const Summarizer = ({ onButtonClick }) => {
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
  } = useSummarizer();

  const { fontSize } = useFontSize();

  return (
    <div style={{ fontSize: fontSize }}>
      <SummarizeBtns
        handleSummarizeSelection={() => { handleSummarizeSelection(); onButtonClick(); }}
        handleSummarizeEntirePageWithChrome={() => { handleSummarizeEntirePageWithChrome(); onButtonClick(); }}
        loading={loading}
      />
      {summary && (
        <DisplaySummary
          summary={summary}
          handleRewrite={() => { handleRewrite(); onButtonClick(); }}
          loading={loading}
          copyMessage={copyMessage}
          setCopyMessage={setCopyMessage}
        />
      )}
      {responseText && <ResponseApi responseText={responseText} />}
      <UserInput
        userInput={userInput}
        setUserInput={setUserInput}
        handleUserInput={() => { handleUserInput(); onButtonClick(); }}
        loading={loading}
      />
    </div>
  );
};

export default Summarizer;
