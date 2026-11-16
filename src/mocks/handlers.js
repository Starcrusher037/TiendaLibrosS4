import { rest } from 'msw';
import { categories, books } from '../data/mockData';

export const handlers = [
  // GET /api/categories — lista todas las categorías
  rest.get('/api/categories', (req, res, ctx) => {
    return res(ctx.json([...categories]));
  }),

  // GET /api/categories/:categoryId/books — libros de una categoría
  rest.get('/api/categories/:categoryId/books', (req, res, ctx) => {
    const { categoryId } = req.params;
    const category = categories.find((c) => c.id === categoryId);
    if (!category) {
      return res(
        ctx.status(404),
        ctx.json({ message: `Categoría "${categoryId}" no encontrada.` })
      );
    }
    const filtered = books.filter((b) => b.categoryId === categoryId);
    return res(ctx.json(filtered));
  }),

  // GET /api/categories/:categoryId — detalle de una categoría
  rest.get('/api/categories/:categoryId', (req, res, ctx) => {
    const { categoryId } = req.params;
    const category = categories.find((c) => c.id === categoryId);
    if (!category) {
      return res(
        ctx.status(404),
        ctx.json({ message: `Categoría "${categoryId}" no encontrada.` })
      );
    }
    return res(ctx.json(category));
  }),

  // GET /api/books/featured — libros destacados
  rest.get('/api/books/featured', (req, res, ctx) => {
    const limit = parseInt(req.url.searchParams.get('limit') || '4', 10);
    const featured = books.filter((b) => b.rating >= 4.8).slice(0, limit);
    return res(ctx.json(featured));
  }),

  // GET /api/books — todos los libros (con búsqueda opcional ?search=)
  rest.get('/api/books', (req, res, ctx) => {
    const query = req.url.searchParams.get('search') || '';
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
    return res(ctx.json(result));
  }),

  // GET /api/books/:bookId — detalle de un libro
  rest.get('/api/books/:bookId', (req, res, ctx) => {
    const { bookId } = req.params;
    const book = books.find((b) => String(b.id) === String(bookId));
    if (!book) {
      return res(
        ctx.status(404),
        ctx.json({ message: `Libro "${bookId}" no encontrado.` })
      );
    }
    return res(ctx.json(book));
  }),
];
