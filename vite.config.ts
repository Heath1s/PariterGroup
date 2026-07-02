import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import seoShell from './seo-shell-plugin'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), seoShell()],
  base: '/',
})
