import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // Update this to your backend server's address
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // Rewriting path to remove '/api'
      },
    },
  },
});
