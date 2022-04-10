import React from "react";

function DeleteModal({ title, setShowModal, handleDelete }) {
  return (
    <>
      <div
        onClick={() => setShowModal(false)}
        className="absolute top-0 left-0 h-screen w-screen bg-black opacity-50 flex items-center justify-center z-40"
      ></div>
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2  p-4 bg-gray-200 dark:bg-slate-600 rounded flex flex-col justify-center items-center space-y-4 z-50 max-w-sm">
        <h2>Are you sure you want to delete "{title}"?</h2>
        <div className="space-x-4">
          <button
            className="delete-modal-buttons"
            onClick={() => setShowModal(false)}
          >
            No
          </button>
          <button className="delete-modal-buttons" onClick={handleDelete}>
            Yes
          </button>
        </div>
      </div>
    </>
  );
}

export default DeleteModal;
