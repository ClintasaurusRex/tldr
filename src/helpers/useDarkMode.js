import { useState, useEffect } from "react";

const useDarkMode = function () {
  const [darkMode, setDarkMode] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    chrome.storage.sync.get(["darkMode"], (result) => {
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
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  };

  useEffect(() => {
    // Retrieve the dark mode setting from chrome.storage
    chrome.storage.sync.get(["darkMode"], (result) => {
      setIsDarkMode(result.darkMode || false);
    });
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  return {
    darkMode,
    setDarkMode,
    darkModeChange,
    applyDarkMode,
    isDarkMode,
    setDarkMode,
  };
};

export default useDarkMode;
