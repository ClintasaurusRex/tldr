import './SummarizeBtns.scss';


const SummarizeBtns = function (props) {
  const {
    handleSummarizeSelection,
    handleSummarizeEntirePageWithChrome,
    loading
  } = props;

  return (
    <div className="summarize-btns">
      {/* Button to Summarize Highlighted Text */}
      <button onClick={handleSummarizeSelection} disabled={loading}>
        {loading ? 'Summarizing Selection...' : 'Summarize Selection'}
      </button>

      {/* Button to Summarize the Entire Page */}
      <button onClick={handleSummarizeEntirePageWithChrome} disabled={loading}>
        {loading ? 'Summarizing Entire Page...' : 'Summarize Entire Page'}
      </button>
    </div>
  );
};

export default SummarizeBtns;