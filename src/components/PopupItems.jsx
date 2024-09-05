import React, { useState, useEffect } from 'react';
import Summarizer from "./Summarizer";
import './PopupItems.scss';

const PopupItems = function () {
  const [selectedText, setSelectedText] = useState('');

  useEffect(() => {
    chrome.runtime.sendMessage({ type: 'GET_SELECTED_TEXT' }, (response) => {
      setSelectedText(response.text);
    });
  }, []);

  const openAboutPage = (e) => {
    e.preventDefault();
    chrome.tabs.create({ url: chrome.runtime.getURL('about/about.html') });
  };

  const openOptionsPage = (e) => {
    e.preventDefault();
    chrome.runtime.openOptionsPage(); 
  };

  const openDonationsPage = (e) => {
    e.preventDefault();
    chrome.tabs.create({ url: chrome.runtime.getURL('donations/donations.html') });
  };

  return (
    <div className="container">
      <div className="header">
        <h1>T.L.D.R.</h1>
      </div>
      <div className="links-to">
        <a href="#" onClick={openOptionsPage}>Options</a>
        <a href="#" onClick={openAboutPage}>About</a>
        <a href="#" onClick={openDonationsPage}>Donate</a>
      </div>
      <main className="main-content">
        <section className="summary-container" aria-labelledby="summary-heading">
          <h2 id="summary-heading">Summary</h2>
          <p id="summary-text">{selectedText}</p>
        </section>
        <section className="buttons">
          <Summarizer />
        </section>
      </main>

    </div>
  );
};

export default PopupItems;