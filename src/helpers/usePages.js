import { useState, useEffect } from "react";

const usePages = function () {
  const openAboutPage = (e) => {
    e.preventDefault();
    chrome.tabs.create({ url: chrome.runtime.getURL("about/about.html") });
  };

  const openOptionsPage = (e) => {
    e.preventDefault();
    chrome.runtime.openOptionsPage();
  };

  const openDonationsPage = (e) => {
    e.preventDefault();
    chrome.tabs.create({
      url: chrome.runtime.getURL("donations/donations.html"),
    });
  };

  const [selectedText, setSelectedText] = useState("");

  useEffect(() => {
    chrome.runtime.sendMessage({ type: "GET_SELECTED_TEXT" }, (response) => {
      setSelectedText(response.text);
    });
  }, []);

  return {
    openAboutPage,
    openOptionsPage,
    openDonationsPage,
    selectedText,
    setSelectedText,
  };
};

export default usePages;
