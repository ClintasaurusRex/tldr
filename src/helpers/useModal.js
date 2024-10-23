import useSound from "../helpers/useSound";
import { useState, useEffect } from "react";

const useModal = (handleSummarizeSelection, handleSummarizeEntirePageWithChrome) => {
  const { playSound } = useSound(0.2);

  const [selectionClickCount, setSelectionClickCount] = useState(0);
  const [pageClickCount, setPageClickCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Load counts from storage when the component mounts
    chrome.storage.local.get(["selectionClickCount", "pageClickCount"], (result) => {
      setSelectionClickCount(result.selectionClickCount || 0);
      setPageClickCount(result.pageClickCount || 0);
    });
  }, []);

  const updateCountInStorage = (key, count) => {
    chrome.storage.local.set({ [key]: count });
  };

  const handleSelectionClick = () => {
    const newCount = selectionClickCount + 1;
    setSelectionClickCount(newCount);
    updateCountInStorage("selectionClickCount", newCount);

    if (newCount % 2 === 0) {
      setIsModalOpen(true);
      setSelectionClickCount(0);
      updateCountInStorage("selectionClickCount", 0);
      return;
    }

    handleSummarizeSelection();
    playSound();
  };

  const handlePageClick = () => {
    const newCount = pageClickCount + 1;
    setPageClickCount(newCount);
    updateCountInStorage("pageClickCount", newCount);

    if (newCount % 10 === 0) {
      setIsModalOpen(true);
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
