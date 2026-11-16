import React from 'react';
import { Link } from 'react-router';

function CategoryCard({ category }) {
  if (!category) return null;

  return (
    <div className="category-card">
      <div className="category-card-body">
        <span className="badge category-badge">
          {category.itemCount ? `${category.itemCount} titulos` : 'Catalogo'}
        </span>
        <h3 className="category-card-title">{category.name}</h3>
        <p className="category-card-description">{category.description}</p>
      </div>

      <div className="category-card-footer">
        <Link
          to={`/categorias/${category.id}`}
          className="btn btn-primary btn-block"
        >
          Explorar categoria
        </Link>
      </div>
    </div>
  );
}

export default CategoryCard;
