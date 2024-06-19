// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

import { compilerOptions } from './tsconfig.json'
import { resolve } from 'path'

const alias = Object.entries(compilerOptions.paths).reduce((acc, [key, [value]]) => {
  const aliasKey = key.substring(0, key.length - 2)
  const path = value.substring(0, value.length - 2)
  return {
    ...acc,
    [aliasKey]: resolve(__dirname, path)
  }
}, {})

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias
  },
  test: {
    globals: true,
    setupFiles: ['./src/test/globalSetup.ts'],
    environment: 'jsdom',
    coverage: {
      exclude: ['.eslintrc.cjs', 'postcss.config.mjs', 'src/index.ts'],
      reporter: ['json-summary', 'text'],
      reportOnFailure: true
    }
  }
})
