import { useEffect } from "react";
import { copyToClipboard } from "../helpers/colinho";
import useFontSize from "../helpers/useFontSize";
import "./DisplaySummary.scss";

const DisplaySummary = function (props) {
  const { summary, handleRewrite, loading, copyMessage, setCopyMessage } = props;
  const { fontSizeChange, fontSize } = useFontSize();

  useEffect(() => {
    if (copyMessage) {
      const timer = setTimeout(() => {
        setCopyMessage("");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [copyMessage, setCopyMessage]);

  return (
    <div>
      <section className="display-summary">
        <h2>Summary</h2>
        <article id="summary-response" style={{ fontSize: fontSize }}>
          {summary}
        </article>
        <br />
        <br />
        <div className="rewrite-copybtns">
          <button onClick={handleRewrite} disabled={loading} className="button">
            {loading ? "Rewriting..." : "Rewrite"}
          </button>
          <button onClick={() => copyToClipboard(summary, setCopyMessage)} className="button">
            Copy to Clipboard
          </button>
          {copyMessage && (
            <div className={`message_copy ${copyMessage ? "" : "hide"}`}>{copyMessage}</div>
          )}
        </div>
      </section>
      <br />
    </div>
  );
};

export default DisplaySummary;
