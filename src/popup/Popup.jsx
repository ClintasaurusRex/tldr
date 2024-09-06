import React, { useState, useEffect } from 'react';
import './Popup.scss';
import PopupItems from '../components/PopupItems';

const Popup = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Retrieve the dark mode setting from chrome.storage
    chrome.storage.sync.get(['darkMode'], (result) => {
      setIsDarkMode(result.darkMode || false);
    });
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  return (
    <div className="Popup">
      <PopupItems />
    </div>
  );
};

export default Popup;