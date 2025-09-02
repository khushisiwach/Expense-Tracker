import React from "react";
import { LuX } from "react-icons/lu";

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black/30">
      <div className="relative w-full max-w-xl max-h-full p-4 ">
        {/* Modal content */}
        <div className="bg-white dark:bg-gray-700 rounded-lg shadow relative">

          {/* Close button: moved outside header */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-white border border-gray-300 rounded-full shadow-md text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white z-50"
          >
            <LuX className="w-6 h-6" />
          </button>

          {/* Header */}
          <div className="flex justify-center items-center p-4 md:p-5 border-b border-gray-200 dark:border-gray-600 rounded-t">
            <h2 className="text-lg font-medium text-gray-600 dark:text-white">
              {title}
            </h2>
          </div>

          {/* Body */}
          <div className="p-4 md:p-5 space-y-4">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
