import './Options.scss';
import { useState, useEffect } from 'react';

const Options = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    chrome.storage.sync.get(['darkMode'], (result) => {
      if (result.darkMode !== undefined) {
        setDarkMode(result.darkMode);
        applyDarkMode(result.darkMode);
      }
    });
  }, []);

  const darkModeChange = (event) => {
    const isChecked = event.target.checked;
    setDarkMode(isChecked);
    chrome.storage.sync.set({ darkMode: isChecked });
    applyDarkMode(isChecked);
  };

  const applyDarkMode = (isDarkMode) => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  };

  return (
    <div className="options-container">
      <h1>T.L.D.R. Options</h1>
      <div className="options-list">
        <div className="option-item">
          <label htmlFor="darkMode">Enable Dark Mode:</label>
          <input
            type="checkbox"
            id="darkMode"
            name="darkMode"
            checked={darkMode}
            onChange={darkModeChange}
          />
        </div>
        <div className="option-item">
          <label htmlFor="notifications">Enable Notifications:</label>
          <input type="checkbox" id="notifications" name="notifications" />
        </div>
        <div className="option-item">
          <label htmlFor="summaryLength">Summary Length:</label>
          <select id="summaryLength" name="summaryLength">
            <option value="short">Short</option>
            <option value="medium">Medium</option>
            <option value="long">Long</option>
          </select>
        </div>
        <div className="option-item">
          <label htmlFor="language">Preferred Language:</label>
          <select id="language" name="language">
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