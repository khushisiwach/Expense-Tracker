import React from "react";

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center w-full h-full bg-black/30">
      <div className="relative p-4 w-full max-w-xl max-h-full">

        {/* Modal content */}
        <div className="bg-white rounded-lg shadow dark:bg-gray-700">

          {/* Header */}
          <div className="flex justify-between items-center p-4 md:p-5 border-b border-gray-200 dark:border-gray-600 rounded-t">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">{title}</h2>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-500 bg-transparent hover:text-gray-700 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
               
                fill="none"
                viewBox="0 0 14 14"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Body */}
          <div className="p-4 md:p-5 space-y-4">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
