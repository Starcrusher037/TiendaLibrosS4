import './polyfills';
import '@testing-library/jest-dom';
import { server } from './mocks/server';

// Levanta el servidor MSW antes de todos los tests
beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }));

// Resetea handlers personalizados después de cada test
afterEach(() => server.resetHandlers());

// Cierra el servidor al terminar todos los tests
afterAll(() => server.close());

// Mock de react-router para tests unitarios (evita carga del módulo ESM)
jest.mock('react-router', () => {
  const mockNavigate = jest.fn();
  return {
    BrowserRouter: ({ children }) => children,
    Routes: ({ children }) => children,
    Route: ({ element }) => element,
    Link: ({ children, to, ...props }) => {
      const React = require('react');
      return React.createElement('a', { href: to, ...props }, children);
    },
    NavLink: ({ children, to, ...props }) => {
      const React = require('react');
      return React.createElement('a', { href: to, ...props }, children);
    },
    useNavigate: () => mockNavigate,
    useParams: () => ({ categoryId: 'ficcion', bookId: 'fic-1' }),
    useLocation: () => ({ pathname: '/' }),
    useSearchParams: () => [new URLSearchParams(), jest.fn()],
    Outlet: () => null,
  };
});
