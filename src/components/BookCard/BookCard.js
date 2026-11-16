import React from 'react';
import { Link } from 'react-router';

function BookCard({ book }) {
  if (!book) return null;

  const formattedPrice = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP'
  }).format(book.price);

  return (
    <article className="book-card">
      <div className="book-card-header">
        <span className="badge badge-accent">{book.categoryName}</span>
        <span className="book-rating" title={`Calificacion: ${book.rating} de 5`}>
          Calificacion: {book.rating} / 5
        </span>
      </div>

      <div className="book-card-body">
        <h4 className="book-card-title">
          <Link to={`/libros/${book.id}`}>{book.title}</Link>
        </h4>
        <p className="book-card-author">Por {book.author}</p>
        <p className="book-card-summary">{book.summary}</p>
      </div>

      <div className="book-card-footer">
        <div className="book-card-meta">
          <span className="book-price">{formattedPrice}</span>
          <span className={`book-stock ${book.stock > 0 ? 'in-stock' : 'out-stock'}`}>
            {book.stock > 0 ? `En stock (${book.stock} un.)` : 'Agotado'}
          </span>
        </div>

        <Link to={`/libros/${book.id}`} className="btn btn-secondary btn-block">
          Ver detalles
        </Link>
      </div>
    </article>
  );
}

export default BookCard;
