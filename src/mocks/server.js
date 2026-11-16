import { setupServer } from 'msw/node';
import { handlers } from './handlers';

// Servidor MSW para el entorno Node (Jest/tests)
export const server = setupServer(...handlers);
