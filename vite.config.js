import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Served from https://<user>.github.io/SUHIII/
export default defineConfig({
  plugins: [react()],
  base: '/SUHIII/',
})
