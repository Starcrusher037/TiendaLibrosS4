import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

// Worker MSW para el entorno navegador (desarrollo)
export const worker = setupWorker(...handlers);
