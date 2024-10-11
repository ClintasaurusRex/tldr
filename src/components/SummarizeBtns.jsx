import useFontSize from "../helpers/useFontSize";
import "./SummarizeBtns.scss";
// import useModal from "../helpers/useModal";
import Modal from "./Modal";
// import usePages from "../helpers/usePages";
import useSummarizer from "../helpers/useSummarizer";
import useSound from "../helpers/useSound";
import { useState } from "react";

const SummarizeBtns = function () {
  const { fontSize } = useFontSize();
  // const { handleSelectionClick, handlePageClick, isModalOpen, setIsModalOpen } = useModal();

  const { handleSummarizeSelection, handleSummarizeEntirePageWithChrome, loading } =
    useSummarizer();

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

  return (
    <div className="summarize-btns">
      {/* Button to Summarize Highlighted Text */}
      <button style={{ fontSize: fontSize }} onClick={handleSelectionClick} disabled={loading}>
        {loading ? "Summarizing Selection..." : "Summarize Selection"}
      </button>

      {/* Button to Summarize the Entire Page */}
      <button style={{ fontSize: fontSize }} onClick={handlePageClick} disabled={loading}>
        {loading ? "Summarizing Entire Page..." : "Summarize Entire Page"}
      </button>

      {/* Modal for donation message */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <p className="modal-msg">
          Thank you for using our service! Consider making a donation to support us.
        </p>
      </Modal>
    </div>
  );
};

export default SummarizeBtns;
