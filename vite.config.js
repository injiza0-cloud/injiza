import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5173,
    host: true,
    fs: {
      allow: ['..']
    }
  },
  resolve: {
    alias: {
      '/videos': resolve(__dirname, 'public/videos')
    }
  },
  assetsInclude: ['**/*.mp4']
})