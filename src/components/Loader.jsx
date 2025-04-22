import React from 'react';
import '../styles/Loader.css';

const Loader = () => {
  return (
    <div className="loader-overlay">
      <div className="loader-container">
        <div className="loader"></div>
        <h2 className="loading-text">Loading...</h2>
      </div>
    </div>
  );
};

export default Loader;
