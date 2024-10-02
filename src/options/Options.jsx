import useDarkMode from "../helpers/useDarkMode";
import useFontSize from "../helpers/useFontSize";
import { useEffect, useState } from "react";
import "./Options.scss";
import useSummarizer from "../helpers/useSummarizer";

const Options = () => {
  const { darkMode, darkModeChange } = useDarkMode();
  const { fontSizeChange, fontSize } = useFontSize();

  const { summaryLength, handleSummaryLengthChange } = useSummarizer();

  return (
    <div className="options-container">
      <h1 id="tldr-options">T.L.D.R. Options</h1>
      <div className="options-list">
        <div className="option-item">
          <label htmlFor="darkMode">Enable Night Mode:</label>
          <input
            type="checkbox"
            id="darkMode"
            name="darkMode"
            checked={darkMode}
            onChange={darkModeChange}
          />
        </div>

        <div className="option-item">
          <label htmlFor="fontSize">Font Size:</label>
          <select id="fontSize" name="fontSize" value={fontSize} onChange={fontSizeChange}>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
            <option value="x-large">Extra Large</option>
          </select>
        </div>

        {/* <div className="option-item">
          <label htmlFor="notifications">Enable Notifications:</label>
          <input type="checkbox" id="notifications" name="notifications" />
        </div> */}

        <div className="option-item">
          <label htmlFor="summaryLength">Summary Length:</label>
          <select
            id="summaryLength"
            name="summaryLength"
            value={summaryLength}
            onChange={handleSummaryLengthChange}
          >
            <option value="short">Short</option>
            <option value="medium">Medium</option>
            <option value="long">Long</option>
          </select>
        </div>

        {/* <div className="option-item">
          <label htmlFor="autoSave">Enable Auto Save:</label>
          <input type="checkbox" id="autoSave" name="autoSave" />
        </div> */}

        {/* <div className="option-item">
          <label htmlFor="dataRefresh">Data Refresh Rate:</label>
          <select id="dataRefresh" name="dataRefresh">
            <option value="5">Every 5 minutes</option>
            <option value="10">Every 10 minutes</option>
            <option value="30">Every 30 minutes</option>
            <option value="60">Every hour</option>
            <option value="120">Every 2 hours</option>
          </select>
        </div> */}

        {/* <div className="option-item">
          <label htmlFor="soundEffects">Enable Sound Effects:</label>
          <input type="checkbox" id="soundEffects" name="soundEffects" />
        </div> */}

        {/* <div className="option-item">
          <label htmlFor="autoUpdate">Enable Auto Update:</label>
          <input type="checkbox" id="autoUpdate" name="autoUpdate" />
        </div> */}

        {/* <div className="option-item">
          <label htmlFor="privacyMode">Enable Privacy Mode:</label>
          <input type="checkbox" id="privacyMode" name="privacyMode" />
        </div> */}
      </div>

      {darkMode && <h2 id="darkmode-on">Night Mode On</h2>}
    </div>
  );
};

export default Options;
