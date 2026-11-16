import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { bookService } from '../../services/api';
import CategoryCard from '../../components/CategoryCard/CategoryCard';
import BookCard from '../../components/BookCard/BookCard';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

function HomePage() {
  const [categories, setCategories] = useState([]);
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [categoriesData, booksData] = await Promise.all([
        bookService.getCategories(),
        bookService.getFeaturedBooks(3)
      ]);
      setCategories(categoriesData);
      setFeaturedBooks(booksData);
    } catch (err) {
      setError(err.message || 'Error al conectar con la API mock.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-content">
          <span className="badge badge-accent hero-tag">Tienda Oficial de Libros</span>
          <h1 className="hero-title">Encuentra tu proxima gran lectura</h1>
          <p className="hero-description">
            Explora nuestra coleccion organizada por categorias tematicas.
            Desde clasicos universales hasta las ultimas novedades en ciencia ficcion,
            historia, tecnologia y biografias.
          </p>
          <div className="hero-actions">
            <Link to="/categorias" className="btn btn-primary">
              Explorar categorias
            </Link>
            <Link to="/catalogo" className="btn btn-secondary">
              Ver catalogo completo
            </Link>
          </div>
        </div>
      </section>

      {loading && <LoadingSpinner message="Cargando categorias y novedades..." />}

      {error && (
        <ErrorMessage
          title="Error al cargar la tienda"
          message={error}
          onRetry={loadData}
        />
      )}

      {!loading && !error && (
        <>
          <section className="home-section">
            <div className="section-header">
              <div>
                <h2 className="section-title">Categorias destacadas</h2>
                <p className="section-subtitle">
                  Selecciona una categoria para descubrir los titulos disponibles
                </p>
              </div>
              <Link to="/categorias" className="section-link">
                Ver todas las categorias &rarr;
              </Link>
            </div>

            <div className="categories-grid">
              {categories.slice(0, 3).map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </section>

          <section className="home-section">
            <div className="section-header">
              <div>
                <h2 className="section-title">Libros recomendados</h2>
                <p className="section-subtitle">
                  Obras aclamadas por la critica y nuestros lectores
                </p>
              </div>
              <Link to="/catalogo" className="section-link">
                Explorar todos los libros &rarr;
              </Link>
            </div>

            <div className="books-grid">
              {featuredBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          </section>

          <section className="features-banner">
            <div className="feature-item">
              <h3 className="feature-title">Envios a todo el pais</h3>
              <p className="feature-text">Despacho seguro y seguimiento en linea de tu pedido.</p>
            </div>
            <div className="feature-item">
              <h3 className="feature-title">Catalogo verificado</h3>
              <p className="feature-text">Ediciones oficiales y revision minuciosa de cada ejemplar.</p>
            </div>
            <div className="feature-item">
              <h3 className="feature-title">Atencion personalizada</h3>
              <p className="feature-text">Asesoria experta para encontrar la lectura adecuada.</p>
            </div>
          </section>
        </>
      )}
    </div>
  );
}

export default HomePage;
