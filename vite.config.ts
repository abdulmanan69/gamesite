import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Relative asset paths so the built site works under any sub-path,
  // e.g. https://abdulmanan69.github.io/gamesite/
  base: './',
})
