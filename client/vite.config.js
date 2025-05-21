import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: 'localhost', 
    port: 5173,
    strictPort: true,
    proxy: {
      '/api/anime': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
      '/api/products': {
        target: 'http://www.dummyjson.com',
        changeOrigin: true,
      },
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'axios'],
  },
})