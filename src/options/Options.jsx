import React from 'react';
import './Options.scss';

const Options = () => {
  return (
    <div className="options-container">
      <h1>T.L.D.R. Options</h1>
      <div className="options-list">
        <div className="option-item">
          <label htmlFor="darkMode">Enable Dark Mode:</label>
          <input type="checkbox" id="darkMode" name="darkMode" enabled />
        </div>
        <div className="option-item">
          <label htmlFor="notifications">Enable Notifications:</label>
          <input type="checkbox" id="notifications" name="notifications" enabled />
        </div>
        <div className="option-item">
          <label htmlFor="summaryLength">Summary Length:</label>
          <select id="summaryLength" name="summaryLength" enabled>
            <option value="short">Short</option>
            <option value="medium">Medium</option>
            <option value="long">Long</option>
          </select>
        </div>
        <div className="option-item">
          <label htmlFor="language">Preferred Language:</label>
          <select id="language" name="language" enabled>
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Options;
