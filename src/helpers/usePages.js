import { defaultTo } from "lodash";

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
  return {
    openAboutPage,
    openOptionsPage,
    openDonationsPage,
  };
};

export default usePages;
