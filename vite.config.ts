import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    strictPort: false,
    port: 3000,
    proxy: {
      '/neighborhood/v1': {
        target: 'https://proyecto-1-5d0g.onrender.com',
        changeOrigin: true
      }
    }
  }
})
