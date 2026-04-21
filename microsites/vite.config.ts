import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [tailwindcss(), react()],
  // Template selection (luxury-template is the current microsite)
  publicDir: 'templates/luxury-template/public',
})

