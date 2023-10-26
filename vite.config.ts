import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
  define: {
    _global: {},
  },
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://galaxy4276.asuscomm.com:8081/', // TODO: 추후 https 로 변경
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
