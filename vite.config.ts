import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
    return {
      server: {
        proxy: {
          '/api': {
            target: 'http://localhost:4000',
            changeOrigin: true,
          }
        }
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});