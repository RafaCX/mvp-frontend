// src/components/Loader.jsx
import React from 'react';

const Loader = () => {
  return (
    <div className="flex justify-center items-center py-8">
      <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-600 border-opacity-50"></div>
    </div>
  );
};

export default Loader;
