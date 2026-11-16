import React from 'react';

function LoadingSpinner({ message = 'Cargando informacion...' }) {
  return (
    <div className="spinner-container" role="status" aria-live="polite">
      <div className="spinner-circle"></div>
      <p className="spinner-text">{message}</p>
    </div>
  );
}

export default LoadingSpinner;
