import React from "react";
import ReactDOM from "react-dom";

const Modal = ({ isOpen, onRequestClose, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close-button" onClick={onRequestClose}>
          Close
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
