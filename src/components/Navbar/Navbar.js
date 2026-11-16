import React, { useState } from 'react';
import { Link, NavLink } from 'react-router';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="navbar-container">
      <div className="navbar-content">
        <Link to="/" className="navbar-brand" onClick={closeMenu}>
          <span className="brand-highlight">Libreria</span> Central
        </Link>

        <button
          type="button"
          className="navbar-toggle"
          onClick={toggleMenu}
          aria-label="Abrir menu de navegacion"
          aria-expanded={menuOpen}
        >
          <span className="toggle-bar"></span>
          <span className="toggle-bar"></span>
          <span className="toggle-bar"></span>
        </button>

        <nav className={`navbar-nav ${menuOpen ? 'navbar-nav-open' : ''}`}>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? 'nav-link nav-link-active' : 'nav-link'
            }
            onClick={closeMenu}
          >
            Inicio
          </NavLink>

          <NavLink
            to="/categorias"
            className={({ isActive }) =>
              isActive ? 'nav-link nav-link-active' : 'nav-link'
            }
            onClick={closeMenu}
          >
            Categorias
          </NavLink>

          <NavLink
            to="/catalogo"
            className={({ isActive }) =>
              isActive ? 'nav-link nav-link-active' : 'nav-link'
            }
            onClick={closeMenu}
          >
            Catalogo Completo
          </NavLink>

          <NavLink
            to="/nosotros"
            className={({ isActive }) =>
              isActive ? 'nav-link nav-link-active' : 'nav-link'
            }
            onClick={closeMenu}
          >
            Sobre Nosotros
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
