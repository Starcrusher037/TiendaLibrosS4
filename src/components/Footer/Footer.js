import React from 'react';
import { Link } from 'react-router';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-column">
          <h4 className="footer-title">Libreria Central</h4>
          <p className="footer-text">
            Tu destino para explorar mundos, descubrir ideas y sumergirte en las
            mejores obras de la literatura universal y tecnica.
          </p>
        </div>

        <div className="footer-column">
          <h4 className="footer-title">Navegacion</h4>
          <ul className="footer-links">
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/categorias">Categorias</Link></li>
            <li><Link to="/catalogo">Catalogo de Libros</Link></li>
            <li><Link to="/nosotros">Sobre Nosotros</Link></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4 className="footer-title">Categorias Populares</h4>
          <ul className="footer-links">
            <li><Link to="/categorias/ficcion">Ficcion</Link></li>
            <li><Link to="/categorias/ciencia-ficcion">Ciencia Ficcion</Link></li>
            <li><Link to="/categorias/tecnologia">Tecnologia y Programacion</Link></li>
            <li><Link to="/categorias/historia">Historia</Link></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4 className="footer-title">Informacion</h4>
          <p className="footer-text">Atencion de Lunes a Sabado</p>
          <p className="footer-text">Horario: 09:00 - 19:00 hrs</p>
          <p className="footer-text">Contacto: soporte@libreriacentral.cl</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} Libreria Central. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;
