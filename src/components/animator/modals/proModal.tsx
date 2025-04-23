import React from "react";

const ProModal = () => {
  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/50">
      <div className="w-[300px] h-[300px] bg-white dark:bg-gray-900 rounded-lg shadow-lg z-30 flex items-center justify-center">
        <p className="text-center text-black dark:text-white text-lg font-semibold">
          Pro Modal Content
        </p>
      </div>
    </div>
  );
};

export default ProModal;
