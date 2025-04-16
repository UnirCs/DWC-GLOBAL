import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,           // describe/it/expect disponibles sin import
    environment: 'jsdom',    // simula el DOM
    setupFiles: './src/setupTests.js',
    coverage: {
      reporter: ['text', 'html']
    }
  }
});