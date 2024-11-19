import React from "react";

const DeleteConfirmationModal = ({ onClose, onConfirm }) => {
  return (
    <div>
      <p>Are you sure you want to delete this product?</p>
      <button onClick={onConfirm}>Yes</button>
      <button onClick={onClose}>No</button>
    </div>
  );
};

export default DeleteConfirmationModal;
