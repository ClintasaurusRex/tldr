import useSound from "../helpers/useSound";
import { useState } from "react";
// import useSummarizer from "./useSummarizer";

const useModal = (handleSummarizeSelection, handleSummarizeEntirePageWithChrome) => {
  const { playSound } = useSound(0.2);

  const [selectionClickCount, setSelectionClickCount] = useState(0);
  const [pageClickCount, setPageClickCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelectionClick = () => {
    const newCount = selectionClickCount + 1;
    setSelectionClickCount(newCount);

    if (newCount % 2 === 0) {
      setIsModalOpen(true);
      setSelectionClickCount(0);
      return;
    }

    handleSummarizeSelection();
    playSound();
  };

  const handlePageClick = () => {
    const newCount = pageClickCount + 1;
    setPageClickCount(newCount);

    if (newCount % 2 === 0) {
      setIsModalOpen(true);
      setPageClickCount(0);
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
