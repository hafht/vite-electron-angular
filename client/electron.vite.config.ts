import { defineConfig } from 'electron-vite'
import angular from '@analogjs/vite-plugin-angular'
import { resolve } from 'node:path'

export default defineConfig({
  main: {},
  preload: {},
  renderer: {
    root: 'src/renderer',
    plugins: [
      angular({
        tsconfig: resolve(__dirname, 'src/renderer/tsconfig.app.json')
      })
    ],
    server: {
      port: 5173,
      strictPort: true
    }
  }
})
