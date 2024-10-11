import React from "react";
import { openDonationsPage } from "../helpers/usePages";
import "./Modal.scss";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  // const { openDonationsPage } = usePages();

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {children}
        <div className="modal-btns">
          <button onClick={onClose} className="modal-close-btn">
            Close
          </button>
          <button>
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
