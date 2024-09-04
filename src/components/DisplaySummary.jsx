import { copyToClipboard } from '../helpers/colinho';

const DisplaySummary = function (props) {

  const { summary,
    handleRewrite,
    loading,
    copyMessage,
    setCopyMessage
  } = props;

  return (
    <div>
      <h2>Summary</h2><br />
      <p>{summary}</p>
      <button onClick={handleRewrite} disabled={loading}>
        {loading ? 'Rewriting...' : 'Rewrite'}
      </button>
      <button onClick={() => copyToClipboard(summary, setCopyMessage)}>
        Copy to Clipboard
      </button>
      {copyMessage && <div className="copy-message">{copyMessage}</div>}
    </div>
  );

};

export default DisplaySummary;