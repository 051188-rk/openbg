import React from 'react';
import './Loader.css';

function Loader() {
  return (
    <div className="editor-loader">
      {/* Placeholder for loader animation */}
      <div className="editor-loader-spinner"></div>
      <span className="editor-loader-text">Processing...</span>
    </div>
  );
}

export default Loader;
