import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// Netlify serves from the root ('/'). The legacy GitHub Pages deploy serves from
// the '/PariterGroup/' subpath — `npm run deploy` passes that via --base.
export default defineConfig({
  plugins: [react()],
  base: '/',
})
