
import Summarizer from "./Summarizer";
import SummaryList from "./SummaryList";
import usePages from '../helpers/usePages';

import './PopupItems.scss';

const PopupItems = function () {

  const {
    openAboutPage,
    openOptionsPage,
    openDonationsPage,
    selectedText,
  } = usePages();

  return (
    <div className="container">
      <div className="header">
        <h1 className='extentsion-title'>T.L.D.R.</h1>
      </div>
      <div className="links-to">
        <a href="#" onClick={openOptionsPage}>Options</a>
        <a href="#" onClick={openAboutPage}>About</a>
        <a href="#" onClick={openDonationsPage}>Donate</a>
      </div>
      <main className="main-content">
        <section className="summary-container" aria-labelledby="summary-heading">
          <h2 id="summary-heading">Summarizer</h2>
          <p id="summary-text">{selectedText}</p>
        </section>
        <section className="buttons">
          <Summarizer />
        </section>
        <section className="saved-summaries">
          <SummaryList />
        </section>
      </main>

    </div>
  );
};

export default PopupItems;