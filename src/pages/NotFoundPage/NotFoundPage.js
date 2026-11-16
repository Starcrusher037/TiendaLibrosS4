import React from 'react';
import { Link } from 'react-router';

function NotFoundPage() {
  return (
    <div className="not-found-page">
      <div className="not-found-card">
        <span className="not-found-code">404</span>
        <h1 className="not-found-title">Pagina no encontrada</h1>
        <p className="not-found-message">
          Lo sentimos, la pagina o seccion que estas buscando no existe o ha sido movida.
        </p>

        <div className="not-found-actions">
          <Link to="/" className="btn btn-primary">
            Ir al Inicio
          </Link>
          <Link to="/categorias" className="btn btn-secondary">
            Ver Categorias
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
