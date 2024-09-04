import SummarizeBtns from './SummarizeBtns.jsx';
import DisplaySummary from './DisplaySummary.jsx';
import UserInput from './UserInput.jsx';
import ResponseApi from './ResponseApi.jsx';
import useSummarizer from '../helpers/useSummarizer.js';

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
    setCopyMessage
  } = useSummarizer();

  return (
    <div>
      <SummarizeBtns
        handleSummarizeSelection={handleSummarizeSelection}
        handleSummarizeEntirePageWithChrome={handleSummarizeEntirePageWithChrome}
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
      {responseText && (
        <ResponseApi
          responseText={responseText}
        />
      )}
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
