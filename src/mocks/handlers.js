import { http, HttpResponse } from 'msw';
import { categories, books } from '../data/mockData';

export const handlers = [
  // GET /api/categories — lista todas las categorías
  http.get('/api/categories', () => {
    return HttpResponse.json([...categories]);
  }),

  // GET /api/categories/:categoryId/books — libros de una categoría
  http.get('/api/categories/:categoryId/books', ({ params }) => {
    const { categoryId } = params;
    const category = categories.find((c) => c.id === categoryId);
    if (!category) {
      return HttpResponse.json(
        { message: `Categoría "${categoryId}" no encontrada.` },
        { status: 404 }
      );
    }
    const filtered = books.filter((b) => b.categoryId === categoryId);
    return HttpResponse.json(filtered);
  }),

  // GET /api/categories/:categoryId — detalle de una categoría
  http.get('/api/categories/:categoryId', ({ params }) => {
    const { categoryId } = params;
    const category = categories.find((c) => c.id === categoryId);
    if (!category) {
      return HttpResponse.json(
        { message: `Categoría "${categoryId}" no encontrada.` },
        { status: 404 }
      );
    }
    return HttpResponse.json(category);
  }),

  // GET /api/books/featured — libros destacados
  http.get('/api/books/featured', ({ request }) => {
    const url = new URL(request.url);
    const limit = parseInt(url.searchParams.get('limit') || '4', 10);
    const featured = books.filter((b) => b.rating >= 4.8).slice(0, limit);
    return HttpResponse.json(featured);
  }),

  // GET /api/books — todos los libros (con búsqueda opcional ?search=)
  http.get('/api/books', ({ request }) => {
    const url = new URL(request.url);
    const query = url.searchParams.get('search') || '';
    let result = [...books];
    if (query.trim()) {
      const lower = query.toLowerCase();
      result = result.filter(
        (b) =>
          b.title.toLowerCase().includes(lower) ||
          b.author.toLowerCase().includes(lower) ||
          (b.categoryName && b.categoryName.toLowerCase().includes(lower))
      );
    }
    return HttpResponse.json(result);
  }),

  // GET /api/books/:bookId — detalle de un libro
  http.get('/api/books/:bookId', ({ params }) => {
    const { bookId } = params;
    const book = books.find((b) => String(b.id) === String(bookId));
    if (!book) {
      return HttpResponse.json(
        { message: `Libro "${bookId}" no encontrado.` },
        { status: 404 }
      );
    }
    return HttpResponse.json(book);
  }),
];
