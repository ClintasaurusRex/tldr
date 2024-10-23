import React from "react";
import usePages from "../helpers/usePages";
import useSound from "../helpers/useSound";
import useFontSize from "../helpers/useFontSize"; 
import "./Modal.scss";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  const { openDonationsPage } = usePages();
  const { playSound } = useSound(0.2); 
  const { fontSize } = useFontSize(); 

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ fontSize: fontSize }}>
        {children}
        <div className="modal-btns">
          <button
            onClick={() => {
              playSound();
              onClose();
            }}
            className="modal-close-btn"
            style={{ fontSize: fontSize }} 
          >
            Close
          </button>
          <button style={{ fontSize: fontSize }}>
            <a href="#" onClick={openDonationsPage}>
              Donate
            </a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
