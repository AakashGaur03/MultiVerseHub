import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy:{
      '/api':'http://localhost:8000'              // whenever /api is found in url http://localhost:8000 is appended before /api on its own and it also ensures that CORS error is solved as this is proxy so for server now the request is originated from port 8000 only and not 5173 that is current 
    },
  },
  plugins: [react()],
})
