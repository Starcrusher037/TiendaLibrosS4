import React from 'react';

function ErrorMessage({ title = 'Ocurrio un problema', message, onRetry }) {
  return (
    <div className="error-card" role="alert">
      <div className="error-header">
        <span className="error-badge">Error</span>
        <h3 className="error-title">{title}</h3>
      </div>
      <p className="error-message">
        {message || 'No se pudo cargar la informacion requerida. Por favor, intenta nuevamente.'}
      </p>
      {onRetry && (
        <button type="button" className="btn btn-secondary btn-retry" onClick={onRetry}>
          Reintentar
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;
