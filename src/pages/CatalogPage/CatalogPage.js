import React, { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router';
import { bookService } from '../../services/api';
import BookCard from '../../components/BookCard/BookCard';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

function CatalogPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('categoria') || 'todas';

  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('relevance');

  const loadCatalogData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [allBooks, allCategories] = await Promise.all([
        bookService.getAllBooks(),
        bookService.getCategories()
      ]);
      setBooks(allBooks);
      setCategories(allCategories);
    } catch (err) {
      setError(err.message || 'Error al obtener los datos del catalogo.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCatalogData();
  }, []);

  const handleCategoryChange = (catId) => {
    setSelectedCategory(catId);
    if (catId === 'todas') {
      searchParams.delete('categoria');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ categoria: catId });
    }
  };

  const filteredBooks = useMemo(() => {
    let result = [...books];

    if (selectedCategory !== 'todas') {
      result = result.filter(
        (b) => b.categoryId.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
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
  }, [books, selectedCategory, searchQuery, sortBy]);

  return (
    <div className="catalog-page">
      <div className="catalog-header">
        <span className="badge badge-accent">Catalogo General</span>
        <h1 className="catalog-title">Todos los Libros</h1>
        <p className="catalog-description">
          Filtra por genero, busca por autor o titulo, y encuentra las mejores lecturas.
        </p>
      </div>

      {loading && <LoadingSpinner message="Consultando API REST para cargar el catalogo..." />}

      {error && (
        <ErrorMessage
          title="Fallo al obtener el catalogo"
          message={error}
          onRetry={loadCatalogData}
        />
      )}

      {!loading && !error && (
        <>
          <div className="catalog-filters-section">
            <div className="category-chips">
              <button
                type="button"
                className={`chip ${selectedCategory === 'todas' ? 'chip-active' : ''}`}
                onClick={() => handleCategoryChange('todas')}
              >
                Todas las categorias ({books.length})
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  className={`chip ${selectedCategory === cat.id ? 'chip-active' : ''}`}
                  onClick={() => handleCategoryChange(cat.id)}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            <div className="catalog-controls">
              <div className="catalog-search">
                <input
                  type="text"
                  className="search-input"
                  placeholder="Buscar por titulo o autor..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button
                    type="button"
                    className="clear-search-btn"
                    onClick={() => setSearchQuery('')}
                  >
                    Limpiar
                  </button>
                )}
              </div>

              <div className="catalog-sort">
                <label htmlFor="catalog-sort-select" className="sort-label">
                  Ordenar:
                </label>
                <select
                  id="catalog-sort-select"
                  className="sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="relevance">Relevancia</option>
                  <option value="price-asc">Precio: Menor a Mayor</option>
                  <option value="price-desc">Precio: Mayor a Menor</option>
                  <option value="rating">Calificacion</option>
                  <option value="title">Titulo</option>
                </select>
              </div>
            </div>
          </div>

          <div className="catalog-meta">
            Mostrando {filteredBooks.length} de {books.length} titulos
          </div>

          {filteredBooks.length === 0 ? (
            <div className="empty-state">
              <h3>No se encontraron resultados</h3>
              <p>Intenta ajustar la busqueda o el filtro de categoria.</p>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  setSelectedCategory('todas');
                  setSearchQuery('');
                }}
              >
                Limpiar filtros
              </button>
            </div>
          ) : (
            <div className="books-grid">
              {filteredBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default CatalogPage;
