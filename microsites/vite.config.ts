import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [tailwindcss(), react()],
  // Template selection (template-1 is the current microsite)
  publicDir: 'templates/template-1/public',
})

