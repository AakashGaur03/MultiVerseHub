import React, { useEffect } from "react";
import { Modal } from "react-bootstrap";

const ModalComponent = ({ show, handleClose, title, children }) => {
  useEffect(() => {
    const stars = document.querySelectorAll(".star");

    stars.forEach((star) => {
      star.style.top = `${Math.random() * 100}%`;
      star.style.left = `${Math.random() * 100}%`;
    });
  }, []);

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      backdrop="static"
      dialogClassName="modal-dialog-centered"
    >
      <Modal.Body>
        <div className="p-4 shawdow_class form position-relative overflow-hidden">
          <div className="star-container">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="star" id={`star${index + 1}`}></div>
            ))}
          </div>

          <h3 className="text-center">{title}</h3>
          <div className="title-2">
            <span>SPACE</span>
          </div>
          {children}
          <div className="flex justify-center mt-4">
            <button className="btn btn-primary " onClick={handleClose}>
              Close
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ModalComponent;
