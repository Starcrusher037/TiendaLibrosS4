import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import CategoriesPage from './pages/CategoriesPage/CategoriesPage';
import CategoryDetailPage from './pages/CategoryDetailPage/CategoryDetailPage';
import BookDetailPage from './pages/BookDetailPage/BookDetailPage';
import { bookService } from './services/api';

describe('Tienda de Libros - Pruebas de aplicacion y navegacion', () => {
  test('renderiza la marca de la tienda y los enlaces de navegacion', () => {
    render(<App />);

    const brandLink = screen.getByRole('link', { name: /Libreria Central/i });
    expect(brandLink).toBeInTheDocument();

    const inicioLinks = screen.getAllByRole('link', { name: /^inicio$/i });
    expect(inicioLinks.length).toBeGreaterThanOrEqual(1);

    const categoriasLinks = screen.getAllByRole('link', { name: /^categorias$/i });
    expect(categoriasLinks.length).toBeGreaterThan(0);
  });

  test('carga y muestra las categorias destacadas en la pagina de inicio', async () => {
    render(<App />);

    await waitFor(
      () => {
        expect(screen.getByText('Categorias destacadas')).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });

  test('CategoriesPage lista las categorias obtenidas desde la API REST mock', async () => {
    render(<CategoriesPage />);

    await waitFor(
      () => {
        expect(screen.getByText('Categorias de Libros')).toBeInTheDocument();
        expect(screen.getByText('Ficcion')).toBeInTheDocument();
        expect(screen.getByText('Ciencia Ficcion')).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });

  test('CategoryDetailPage muestra el detalle de la categoria y sus libros', async () => {
    render(<CategoryDetailPage />);

    await waitFor(
      () => {
        const matchingBooks = screen.getAllByText('Cien Anos de Soledad');
        expect(matchingBooks.length).toBeGreaterThan(0);
      },
      { timeout: 3000 }
    );
  });

  test('BookDetailPage muestra la informacion detallada del libro seleccionado', async () => {
    render(<BookDetailPage />);

    await waitFor(
      () => {
        const bookTitleHeading = screen.getByRole('heading', { name: 'Cien Anos de Soledad' });
        expect(bookTitleHeading).toBeInTheDocument();
        expect(screen.getByText(/Gabriel Garcia Marquez/i)).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });

  test('el servicio de API REST mock retorna las categorias esperadas', async () => {
    const categories = await bookService.getCategories();
    expect(Array.isArray(categories)).toBe(true);
    expect(categories.length).toBeGreaterThanOrEqual(2);

    const ficcion = categories.find((c) => c.id === 'ficcion');
    expect(ficcion).toBeDefined();
    expect(ficcion.name).toBe('Ficcion');

    const scifi = categories.find((c) => c.id === 'ciencia-ficcion');
    expect(scifi).toBeDefined();
    expect(scifi.name).toBe('Ciencia Ficcion');
  });

  test('el servicio de API REST mock retorna libros filtrados por categoria', async () => {
    const books = await bookService.getBooksByCategory('ficcion');
    expect(Array.isArray(books)).toBe(true);
    expect(books.length).toBeGreaterThan(0);
    books.forEach((book) => {
      expect(book.categoryId).toBe('ficcion');
    });
  });

  test('el servicio de API REST mock arroja error al buscar categoria inexistente', async () => {
    await expect(bookService.getCategoryById('categoria-inexistente')).rejects.toThrow(
      /no encontrada/i
    );
  });
});
