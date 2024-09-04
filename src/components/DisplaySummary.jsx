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
      <section className='display-summary'>
        <h2>Summary</h2>
        <p>{summary}</p><br />
        <button onClick={handleRewrite} disabled={loading}>
          {loading ? 'Rewriting...' : 'Rewrite'}
        </button>
        <button onClick={() => copyToClipboard(summary, setCopyMessage)}>
          Copy to Clipboard
        </button>
        {copyMessage && <div className="copy-message">{copyMessage}</div>}
      </section>
    </div>

  );

};

export default DisplaySummary;