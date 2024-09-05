import { copyToClipboard } from '../helpers/colinho';
import './DisplaySummary.scss';

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
        <article>{summary}</article><br />
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
    </div>
  );
};
export default DisplaySummary;



