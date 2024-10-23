// import React, { useState } from "react";
import "./SummarizeBtns.scss";
import useFontSize from "../helpers/useFontSize";
// import useSound from "../helpers/useSound";
import Modal from "./Modal";
import useModal from "../helpers/useModal";

const SummarizeBtns = function (props) {
  const { handleSummarizeSelection, handleSummarizeEntirePageWithChrome, loading } = props;
  const { fontSize } = useFontSize();

  const { isModalOpen, setIsModalOpen, handleSelectionClick, handlePageClick } = useModal(
    handleSummarizeSelection,
    handleSummarizeEntirePageWithChrome
  );

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
          Thank you for using our service! Consider making a donation to support us so we can
          continue to provide this service.
        </p>
      </Modal>
    </div>
  );
};

export default SummarizeBtns;
