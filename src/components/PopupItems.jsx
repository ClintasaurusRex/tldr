import React, { useState, useEffect } from 'react';
import Summarizer from "./Api";

const PopupItems = function () {
  const [selectedText, setSelectedText] = useState('');

  useEffect(() => {
    chrome.runtime.sendMessage({ type: 'GET_SELECTED_TEXT' }, (response) => {
      setSelectedText(response.text);
    });
  }, []);

  return (
    <div className="container">
      <div className="header">
        <h1>T.L.D.R.</h1>
      </div>
      <main className="main-content">
        <section className="summary-container" aria-labelledby="summary-heading">
          <h2 id="summary-heading">Summary</h2>
          <p id="summary-text">{selectedText}</p>
        </section>
        <section className="buttons">
          <Summarizer />
        </section>
        {/* <section className="text-area">
          <textarea id="text-input" placeholder="Text Area" aria-label="Text Area"></textarea>
        </section> */}
      </main>
      <div className="footer">
        <a href="#">Options</a>
        <a href="#">About</a>
        <a href="#">Donate</a>
      </div>
    </div>
  );
};

export default PopupItems;