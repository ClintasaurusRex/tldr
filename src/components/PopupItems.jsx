import React from 'react';
import Summarizer from './Summarizer';
import SummaryList from './SummaryList';
import usePages from '../helpers/usePages';
import useFontSize from '../helpers/useFontSize';
import './PopupItems.scss';
import useSound from '../helpers/useSound';

const PopupItems = ({ onButtonClick }) => {
  const { openAboutPage, openOptionsPage, openDonationsPage, selectedText } = usePages();
  const { fontSize } = useFontSize();
  const { playSound } = useSound(); 

 
  return (
    <div className="container">
      <div className="header">
        <h1 className="extentsion-title">T.L.D.R.</h1>
      </div>
      <div className="links-to">
        <a href="#" onClick={openOptionsPage}>
          Options
        </a>
        <a href="#" onClick={openAboutPage}>
          About
        </a>
        <a href="#" onClick={openDonationsPage}>
          Donate
        </a>
      </div>
      <main className="main-content">
        <section
          style={{ fontSize: fontSize }}
          className="summary-container"
          aria-labelledby="summary-heading"
        >
          <h2 id="summary-heading" style={{ fontSize: fontSize }}>
            Summarizer
          </h2>
          <p id="summary-text" style={{ fontSize: fontSize }}>
            {selectedText}
          </p>
        </section>

        
        <section className="buttons">
          
           <Summarizer onButtonClick={playSound} />
        </section>

        <section className="saved-summaries">
          <SummaryList />
        </section>
      </main>
    </div>
  );
}

export default PopupItems;
