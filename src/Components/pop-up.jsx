import React from "react";

export const ModalMessage = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-[#f0ff19] bg-opacity-80 p-4 rounded-lg">
        <p className="text-black text-center">{message}</p>
        <button
          className="mt-4 bg-gray-900 text-black p-2 rounded hover:bg-green-600 focus:outline-none"
          onClick={onClose}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};
