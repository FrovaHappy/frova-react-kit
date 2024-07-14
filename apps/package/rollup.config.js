import typescript from '@rollup/plugin-typescript'
import postcss from 'rollup-plugin-postcss'
import dts from 'rollup-plugin-dts'
import alias from '@rollup/plugin-alias'
import { resolve } from 'node:path'
import autoprefixer from 'autoprefixer'
import terser from '@rollup/plugin-terser'

import pkg from './package.json' assert { type: 'json' }
import ts from './tsconfig.json' assert { type: 'json' }
import process from 'process'

const compilerOptions = ts.compilerOptions

const external = [...Object.keys(pkg.dependencies ?? {}), ...Object.keys(pkg.peerDependencies ?? {})]

const customAlias = Object.entries(compilerOptions.paths).map(([key, [value]]) => {
  const aliasKey = key.substring(0, key.length - 2)
  const path = value.substring(0, value.length - 2)

  const absolutePath = resolve(process.cwd(), path)
  return {
    find: aliasKey,
    replacement: absolutePath
  }
})

const aliasConfig = alias({
  entries: customAlias
})

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: pkg.main,
        format: 'cjs'
      },
      {
        file: pkg.module,
        format: 'esm'
      }
    ],
    plugins: [
      typescript(),
      terser(),
      postcss({
        plugins: [autoprefixer()],
        extensions: ['.scss'],
        use: ['sass']
      }),
      aliasConfig
    ],
    external: [...external, 'react/jsx-runtime']
  },
  {
    input: 'src/index.ts',
    output: [
      {
        file: pkg.types,
        format: 'es'
      }
    ],
    plugins: [dts({ tsconfig: 'tsconfig.build.json' }), aliasConfig],
    external: ['react', /\.(sass|scss|css)$/]
  }
]
