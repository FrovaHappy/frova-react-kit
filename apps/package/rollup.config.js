import json from '@rollup/plugin-json'
import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import postcss from 'rollup-plugin-postcss'
import dts from 'rollup-plugin-dts'
import alias from '@rollup/plugin-alias'
import { resolve } from 'node:path'
import pkg from './package.json' assert { type: 'json' }
import ts from './tsconfig.json' assert { type: 'json' }
import process from 'process'

import postcssPresetEnv from 'postcss-preset-env'
import autoprefixer from 'autoprefixer'
import PostcssModulesPlugin from 'postcss-modules'

const extensions = ['.js', '.jsx', '.ts', '.tsx', '.css', '.json', '.scss']

const compilerOptions = ts.compilerOptions

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
        format: 'esm'
      },
      {
        file: pkg.module,
        format: 'cjs'
      }
    ],
    plugins: [
      json(),
      nodeResolve({ extensions, browser: true }),
      commonjs(),
      typescript(),
      // terser(),
      postcss({
        plugins: [postcssPresetEnv(), autoprefixer(), PostcssModulesPlugin()],
        autoModules: false,
        onlyModules: false,
        extensions: ['.scss'],
        use: ['sass'],
        minimize: true,
        sourceMap: false
        // modules: {
        //   generateScopedName: (name, filename, css) => {
        //     if (filename.includes('global')) {
        //       return name
        //     }
        //     const hash = stringHash(css).toString(36).substring(0, 5)
        //     return `test_${name}_${hash}`
        //   }
        // },
        // extract: 'css/test-library.min.css'
      }),
      aliasConfig
    ],
    external: ['react']
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