import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';
import { bookService } from '../../services/api';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

function BookDetailPage() {
  const { bookId } = useParams();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [addedMessage, setAddedMessage] = useState('');

  const loadBook = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await bookService.getBookById(bookId);
      setBook(data);
    } catch (err) {
      setError(err.message || 'No se encontro la informacion del libro.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBook();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookId]);

  const handleAddToCart = () => {
    if (!book) return;
    setAddedMessage(`Se agregaron ${quantity} ejemplar(es) de "${book.title}" a tu lista de compra.`);
    setTimeout(() => {
      setAddedMessage('');
    }, 4000);
  };

  const formattedPrice = book
    ? new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(book.price)
    : '';

  return (
    <div className="book-detail-page">
      <nav className="breadcrumbs" aria-label="Ruta de navegacion">
        <Link to="/" className="breadcrumb-link">Inicio</Link>
        <span className="breadcrumb-separator">/</span>
        <Link to="/categorias" className="breadcrumb-link">Categorias</Link>
        {book && (
          <>
            <span className="breadcrumb-separator">/</span>
            <Link to={`/categorias/${book.categoryId}`} className="breadcrumb-link">
              {book.categoryName}
            </Link>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">{book.title}</span>
          </>
        )}
      </nav>

      {loading && <LoadingSpinner message="Consultando detalles del libro..." />}

      {error && (
        <ErrorMessage
          title="Error al cargar el libro"
          message={error}
          onRetry={loadBook}
        />
      )}

      {!loading && !error && book && (
        <div className="book-detail-card">
          <div className="book-detail-content">
            <div className="book-detail-main">
              <div className="book-detail-tags">
                <Link to={`/categorias/${book.categoryId}`} className="badge badge-accent">
                  {book.categoryName}
                </Link>
                <span className="badge badge-success">
                  {book.stock > 0 ? `Disponible (${book.stock} unidades)` : 'Agotado'}
                </span>
              </div>

              <h1 className="book-detail-title">{book.title}</h1>
              <p className="book-detail-author">Autor: <strong>{book.author}</strong></p>

              <div className="book-detail-rating-box">
                <span className="rating-score">Calificacion general: {book.rating} / 5</span>
              </div>

              <div className="book-synopsis-section">
                <h3 className="section-heading">Sinopsis</h3>
                <p className="book-synopsis-text">{book.summary}</p>
              </div>

              <div className="book-specs-grid">
                <div className="spec-item">
                  <span className="spec-label">Ano de publicacion</span>
                  <span className="spec-value">{book.year}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Numero de paginas</span>
                  <span className="spec-value">{book.pages}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Editorial</span>
                  <span className="spec-value">{book.publisher}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Codigo ISBN</span>
                  <span className="spec-value">{book.isbn}</span>
                </div>
              </div>
            </div>

            <aside className="book-detail-purchase">
              <div className="purchase-box">
                <span className="purchase-label">Precio por unidad</span>
                <span className="purchase-price">{formattedPrice}</span>

                <div className="quantity-selector">
                  <label htmlFor="quantity-input" className="quantity-label">
                    Cantidad:
                  </label>
                  <select
                    id="quantity-input"
                    className="quantity-select"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    disabled={book.stock === 0}
                  >
                    {[...Array(Math.min(book.stock, 5)).keys()].map((n) => (
                      <option key={n + 1} value={n + 1}>
                        {n + 1}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="button"
                  className="btn btn-accent btn-block"
                  onClick={handleAddToCart}
                  disabled={book.stock === 0}
                >
                  {book.stock > 0 ? 'Agregar al pedido' : 'Sin stock disponible'}
                </button>

                {addedMessage && (
                  <div className="added-notification" role="status">
                    {addedMessage}
                  </div>
                )}

                <div className="purchase-guarantees">
                  <p className="guarantee-item">&bull; Despacho rapido a todo el pais</p>
                  <p className="guarantee-item">&bull; Garantia de devolucion de 30 dias</p>
                  <p className="guarantee-item">&bull; Pagos seguros certificados</p>
                </div>
              </div>

              <div className="back-navigation">
                <Link to={`/categorias/${book.categoryId}`} className="btn btn-secondary btn-block">
                  &larr; Volver a {book.categoryName}
                </Link>
              </div>
            </aside>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookDetailPage;
