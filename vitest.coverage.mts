import { defineConfig } from 'vitest/config'
export default defineConfig({
  test: {
    globals: true,
    coverage: {
      all: true,
      exclude: ['**/node_modules/**', '**/dist/**', '**/mocks/**', '**/src/index.ts'],
      include: ['**/src/**/*.{ts,tsx}'],
      reporter: ['json-summary', 'text'],
      reportOnFailure: true
    }
  }
})
