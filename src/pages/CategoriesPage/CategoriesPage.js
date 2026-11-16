import React, { useEffect, useState } from 'react';
import { bookService } from '../../services/api';
import CategoryCard from '../../components/CategoryCard/CategoryCard';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await bookService.getCategories();
      setCategories(data);
    } catch (err) {
      setError(err.message || 'Error al obtener las categorias desde la API mock.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const filteredCategories = categories.filter((category) => {
    const term = searchTerm.toLowerCase().trim();
    return (
      category.name.toLowerCase().includes(term) ||
      category.description.toLowerCase().includes(term)
    );
  });

  return (
    <div className="categories-page">
      <div className="categories-page-header">
        <div>
          <span className="badge badge-accent">Explorador de generos</span>
          <h1 className="page-title">Categorias de Libros</h1>
          <p className="page-description">
            Selecciona el genero de tu interes para revisar las obras disponibles en
            nuestro catalogo.
          </p>
        </div>

        <div className="categories-search-box">
          <label htmlFor="category-search" className="visually-hidden">
            Buscar categoria
          </label>
          <input
            id="category-search"
            type="text"
            className="search-input"
            placeholder="Buscar categoria por nombre o tema..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              type="button"
              className="clear-search-btn"
              onClick={() => setSearchTerm('')}
              aria-label="Limpiar busqueda"
            >
              Limpiar
            </button>
          )}
        </div>
      </div>

      {loading && <LoadingSpinner message="Consultando API REST mock para listar categorias..." />}

      {error && (
        <ErrorMessage
          title="Fallo en la peticion REST"
          message={error}
          onRetry={fetchCategories}
        />
      )}

      {!loading && !error && (
        <>
          <div className="categories-meta-bar">
            <span>
              Mostrando {filteredCategories.length} de {categories.length} categorias disponibles
            </span>
          </div>

          {filteredCategories.length === 0 ? (
            <div className="empty-state">
              <h3>No se encontraron categorias</h3>
              <p>No existen categorias que coincidan con el termino "{searchTerm}".</p>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setSearchTerm('')}
              >
                Restablecer busqueda
              </button>
            </div>
          ) : (
            <div className="categories-page-grid">
              {filteredCategories.map((cat) => (
                <CategoryCard key={cat.id} category={cat} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default CategoriesPage;
