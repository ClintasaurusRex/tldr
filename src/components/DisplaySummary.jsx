import { copyToClipboard } from '../helpers/colinho';
import './DisplaySummary.scss';
// import "../options/darMode.scss";

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
        <article id='summary-response'>{summary}</article><br />
        <div className='rewrite-copybtns'>
          <button onClick={handleRewrite} disabled={loading}>
            {loading ? 'Rewriting...' : 'Rewrite'}
          </button>
          <button onClick={() => copyToClipboard(summary, setCopyMessage)}>
            Copy to Clipboard
          </button>
          {copyMessage && <div className="copy-message">{copyMessage}</div>}
        </div>
      </section>
      <br />
    </div>
  );
};
export default DisplaySummary;



