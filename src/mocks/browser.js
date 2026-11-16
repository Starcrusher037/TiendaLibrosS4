import { setupWorker } from 'msw';
import { handlers } from './handlers';

// Worker MSW para el entorno navegador (desarrollo)
export const worker = setupWorker(...handlers);
