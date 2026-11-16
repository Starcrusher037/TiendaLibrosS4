import React from 'react';
import { Link } from 'react-router';

function AboutPage() {
  return (
    <div className="about-page">
      <header className="about-header">
        <span className="badge badge-accent">Nuestra Historia</span>
        <h1 className="about-title">Sobre Libreria Central</h1>
        <p className="about-subtitle">
          Comprometidos con la difusion del conocimiento, la literatura y la cultura.
        </p>
      </header>

      <section className="about-section">
        <h2 className="section-title">Mision del Proyecto</h2>
        <p>
          Libreria Central es una plataforma creada para facilitar el acceso a la lectura
          mediante una interfaz intuitiva, moderna y agil. Desarrollada con React y
          React Router, nuestra aplicacion consume una API REST simulada que organiza el
          contenido en distintas categorias literarias para brindar la mejor experiencia
          de navegacion al lector.
        </p>
      </section>

      <section className="about-grid">
        <div className="about-card">
          <h3 className="about-card-title">Arquitectura Modular</h3>
          <p>
            Estructurada bajo principios de diseno limpio y separacion de responsabilidades
            en componentes, servicios de API REST mock y paginas de navegacion con React Router.
          </p>
        </div>

        <div className="about-card">
          <h3 className="about-card-title">Catalogo Especializado</h3>
          <p>
            Diversidad tematica con generos como Ficcion, Ciencia Ficcion, Historia, Tecnologia,
            Biografias y Misterio, asegurando una amplia seleccion de obras.
          </p>
        </div>

        <div className="about-card">
          <h3 className="about-card-title">Experiencia de Usuario</h3>
          <p>
            Diseno adaptable a dispositivos moviles y de escritorio, con tiempos de respuesta
            optimizados, estados de carga y manejo proactivo de errores.
          </p>
        </div>
      </section>

      <div className="about-cta">
        <h3 className="cta-title">Comienza a explorar hoy mismo</h3>
        <p className="cta-text">
          Revisa las diferentes categorias y encuentra tu proximo libro favorito.
        </p>
        <Link to="/categorias" className="btn btn-primary">
          Ir a Categorias
        </Link>
      </div>
    </div>
  );
}

export default AboutPage;
