import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Puerto del servidor de desarrollo
    host: 'localhost', // Host del servidor
  },
  define: {
    'process.env': {}, // Define `process.env` para compatibilidad
  },
});
