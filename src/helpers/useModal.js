import useSound from "../helpers/useSound";
import { useState, useEffect } from "react";

const useModal = (handleSummarizeSelection, handleSummarizeEntirePageWithChrome) => {
  const { playSound } = useSound(0.2);

  const [selectionClickCount, setSelectionClickCount] = useState(0);
  const [pageClickCount, setPageClickCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    chrome.storage.local.get(["selectionClickCount", "pageClickCount"], (result) => {
      setSelectionClickCount(result.selectionClickCount || 0);
      setPageClickCount(result.pageClickCount || 0);
    });
  }, []);

  const updateCountInStorage = (key, count) => {
    chrome.storage.local.set({ [key]: count });
  };

  // This is the timestamp so the modal only pops up every twelve hours, Ill keep the original code in a textfile incase we want to change it

  const shouldShowModal = () => {
    const now = Date.now();
    const twelveHours = 12 * 60 * 60 * 1000;
    // const fiveMinutes = 30 * 1000;

    return new Promise((resolve) => {
      chrome.storage.local.get("lastModalTimestamp", (result) => {
        const lastModalTimestamp = result.lastModalTimestamp || 0;
        if (now - lastModalTimestamp >= twelveHours) {
          chrome.storage.local.set({ lastModalTimestamp: now });
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  };

  const handleSelectionClick = async () => {
    const newCount = selectionClickCount + 1;
    setSelectionClickCount(newCount);
    updateCountInStorage("selectionClickCount", newCount);

    if (newCount % 2 === 0) {
      const showModal = await shouldShowModal();
      if (showModal) {
        setIsModalOpen(true);
      }
      setSelectionClickCount(0);
      updateCountInStorage("selectionClickCount", 0);
      return;
    }

    handleSummarizeSelection();
    playSound();
  };

  const handlePageClick = async () => {
    const newCount = pageClickCount + 1;
    setPageClickCount(newCount);
    updateCountInStorage("pageClickCount", newCount);

    if (newCount % 10 === 0) {
      const showModal = await shouldShowModal();
      if (showModal) {
        setIsModalOpen(true);
      }
      setPageClickCount(0);
      updateCountInStorage("pageClickCount", 0);
      return;
    }

    handleSummarizeEntirePageWithChrome();
    playSound();
  };

  return {
    isModalOpen,
    setIsModalOpen,
    handleSelectionClick,
    handlePageClick,
  };
};

export default useModal;
