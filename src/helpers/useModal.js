import useSound from "../helpers/useSound";
import { useState } from "react";

const useModal = (handleSummarizeSelection, handleSummarizeEntirePageWithChrome) => {
  const { playSound } = useSound(0.2);

  const [selectionClickCount, setSelectionClickCount] = useState(0);
  const [pageClickCount, setPageClickCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const shouldShowModal = () => {
    const now = new Date();
    const lastModalDate = localStorage.getItem("lastModalDate");
    const twelvehrs = 12 * 60 * 60 * 1000; // 12 hrs
    // const thirtySeconds = 30 * 1000; // 30 seconds in milliseconds for testing

    if (lastModalDate) {
      const lastDate = new Date(lastModalDate);
      const timeDifference = now - lastDate;
      if (timeDifference >= twelvehrs) {
        localStorage.setItem("lastModalDate", now.toISOString());
        return true;
      }
      return false;
    } else {
      localStorage.setItem("lastModalDate", now.toISOString());
      return true;
    }
  };

  const handleSelectionClick = () => {
    const newCount = selectionClickCount + 1;
    setSelectionClickCount(newCount);

    if (newCount % 1 === 0 && shouldShowModal()) {
      setIsModalOpen(true);
      handleSummarizeSelection();
      return;
    }

    handleSummarizeSelection();
    playSound();
  };

  const handlePageClick = () => {
    const newCount = pageClickCount + 1;
    setPageClickCount(newCount);

    if (newCount % 1 === 0 && shouldShowModal()) {
      setIsModalOpen(true);
      handleSummarizeEntirePageWithChrome();
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
