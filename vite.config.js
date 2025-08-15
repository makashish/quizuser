// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  // Path your app will be served from
  base: './', // or '/my-subfolder/' if hosted in a subdirectory

  build: {
    outDir: 'dist', // default output folder (you can change to 'build' or something else)
  }
})