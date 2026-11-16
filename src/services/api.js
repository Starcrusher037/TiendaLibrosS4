const BASE_URL = '/api';

/**
 * Cliente HTTP para la API de la tienda de libros.
 * En pruebas y desarrollo, las peticiones a estas rutas son interceptadas por MSW (Mock Service Worker).
 */
export const bookService = {
  /**
   * GET /api/categories
   * Lista todas las categorias disponibles
   */
  async getCategories() {
    const res = await fetch(`${BASE_URL}/categories`);
    if (!res.ok) {
      throw new Error('Error al obtener categorias.');
    }
    return res.json();
  },

  /**
   * GET /api/categories/:categoryId
   * Obtiene la informacion de una categoria por su identificador
   */
  async getCategoryById(categoryId) {
    const res = await fetch(`${BASE_URL}/categories/${encodeURIComponent(categoryId)}`);
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || `Categoria con id "${categoryId}" no encontrada.`);
    }
    return res.json();
  },

  /**
   * GET /api/categories/:categoryId/books
   * Lista los libros pertenecientes a una categoria
   */
  async getBooksByCategory(categoryId) {
    const res = await fetch(`${BASE_URL}/categories/${encodeURIComponent(categoryId)}/books`);
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || 'Error al obtener libros de la categoria.');
    }
    return res.json();
  },

  /**
   * GET /api/books
   * Lista todos los libros con posibilidad de filtro por busqueda
   */
  async getAllBooks(searchQuery = '') {
    const query = searchQuery.trim() ? `?search=${encodeURIComponent(searchQuery.trim())}` : '';
    const res = await fetch(`${BASE_URL}/books${query}`);
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || 'Error al obtener libros.');
    }
    return res.json();
  },

  /**
   * GET /api/books/:bookId
   * Obtiene el detalle de un libro especifico
   */
  async getBookById(bookId) {
    const res = await fetch(`${BASE_URL}/books/${encodeURIComponent(bookId)}`);
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || `Libro con id "${bookId}" no encontrado.`);
    }
    return res.json();
  },

  /**
   * GET /api/books/featured
   * Obtiene una seleccion de libros destacados
   */
  async getFeaturedBooks(limit = 4) {
    const res = await fetch(`${BASE_URL}/books/featured?limit=${limit}`);
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || 'Error al obtener libros destacados.');
    }
    return res.json();
  }
};
