import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react-swc'

import { compilerOptions } from './tsconfig.json'
import process from 'node:process'
import { resolve } from 'path'

const alias = Object.entries(compilerOptions.paths).reduce((acc, [key, [value]]) => {
  const aliasKey = key.substring(0, key.length - 2)
  const path = value.substring(0, value.length - 2)
  return {
    ...acc,
    [aliasKey]: resolve(process.cwd(), path)
  }
}, {})

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias
  },
  test: {
    globals: true,
    setupFiles: ['./test/globalSetup.ts'],
    environment: 'jsdom',
    coverage: {
      exclude: ['.eslintrc.cjs', 'postcss.config.mjs', 'src/index.ts'],
      reporter: ['json-summary', 'text'],
      reportOnFailure: true
    }
  }
})
