import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Link } from 'react-router';
import { bookService } from '../../services/api';
import BookCard from '../../components/BookCard/BookCard';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

function CategoryDetailPage() {
  const { categoryId } = useParams();

  const [category, setCategory] = useState(null);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchFilter, setSearchFilter] = useState('');
  const [sortBy, setSortBy] = useState('relevance');

  const loadCategoryData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [categoryData, booksData] = await Promise.all([
        bookService.getCategoryById(categoryId),
        bookService.getBooksByCategory(categoryId)
      ]);
      setCategory(categoryData);
      setBooks(booksData);
    } catch (err) {
      setError(err.message || 'Error al cargar los libros de esta categoria.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategoryData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId]);

  const processedBooks = useMemo(() => {
    let result = [...books];

    if (searchFilter.trim()) {
      const q = searchFilter.toLowerCase().trim();
      result = result.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q) ||
          b.summary.toLowerCase().includes(q)
      );
    }

    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'title') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  }, [books, searchFilter, sortBy]);

  return (
    <div className="category-detail-page">
      <nav className="breadcrumbs" aria-label="Ruta de navegacion">
        <Link to="/" className="breadcrumb-link">Inicio</Link>
        <span className="breadcrumb-separator">/</span>
        <Link to="/categorias" className="breadcrumb-link">Categorias</Link>
        <span className="breadcrumb-separator">/</span>
        <span className="breadcrumb-current">
          {category ? category.name : categoryId}
        </span>
      </nav>

      {loading && <LoadingSpinner message="Consultando libros de la categoria..." />}

      {error && (
        <ErrorMessage
          title="No se pudo cargar la categoria"
          message={error}
          onRetry={loadCategoryData}
        />
      )}

      {!loading && !error && category && (
        <>
          <header className="category-header">
            <div className="category-header-top">
              <span className="badge badge-accent">Categoria</span>
              <Link to="/categorias" className="btn btn-secondary back-btn">
                &larr; Volver a Categorias
              </Link>
            </div>
            <h1 className="category-title">{category.name}</h1>
            <p className="category-description">{category.description}</p>
          </header>

          <div className="controls-bar">
            <div className="search-filter-box">
              <input
                type="text"
                className="search-input"
                placeholder="Filtrar por titulo o autor..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
              />
              {searchFilter && (
                <button
                  type="button"
                  className="clear-search-btn"
                  onClick={() => setSearchFilter('')}
                >
                  Limpiar
                </button>
              )}
            </div>

            <div className="sort-box">
              <label htmlFor="sort-select" className="sort-label">
                Ordenar por:
              </label>
              <select
                id="sort-select"
                className="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="relevance">Relevancia</option>
                <option value="price-asc">Precio: Menor a Mayor</option>
                <option value="price-desc">Precio: Mayor a Menor</option>
                <option value="rating">Mejor Calificacion</option>
                <option value="title">Titulo (A-Z)</option>
              </select>
            </div>
          </div>

          <div className="results-count">
            Mostrando {processedBooks.length} de {books.length} titulos disponibles en esta seccion
          </div>

          {processedBooks.length === 0 ? (
            <div className="empty-category-state">
              <h3>No se encontraron libros</h3>
              <p>
                {searchFilter
                  ? `No hay coincidencias para el filtro "${searchFilter}".`
                  : 'No hay libros disponibles en esta categoria.'}
              </p>
              {searchFilter && (
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setSearchFilter('')}
                >
                  Restablecer filtros
                </button>
              )}
            </div>
          ) : (
            <div className="books-grid">
              {processedBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default CategoryDetailPage;
