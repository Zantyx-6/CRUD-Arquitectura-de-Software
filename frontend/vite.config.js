import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Redirige todas las peticiones /api al backend
      '/api': {
        target: 'http://localhost:3000', // URL de tu backend
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // Opcional: elimina /api al redirigir
      },
    },
  },
});