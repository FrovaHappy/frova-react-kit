import json from '@rollup/plugin-json'
import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import postcss from 'rollup-plugin-postcss'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import dts from 'rollup-plugin-dts'
import alias from '@rollup/plugin-alias'
// import terser from '@rollup/plugin-terser'

const extensions = ['.js', '.jsx', '.ts', '.tsx', '.css', '.json', '.scss']

import { compilerOptions } from './tsconfig.json'
import { resolve } from 'path'

const customAlias = Object.entries(compilerOptions.paths).reduce((acc, [key, [value]]) => {
  const aliasKey = key.substring(0, key.length - 2)
  const path = value.substring(0, value.length - 2)
  return {
    ...acc,
    [aliasKey]: resolve(__dirname, path)
  }
}, {})

const getAlias = Object.entries(customAlias).map(([key, value]) => {
  return {
    find: key,
    replacement: value
  }
})

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: './dist/index.esm.js',
        format: 'esm'
      },
      {
        file: './dist/index.cjs.js',
        format: 'cjs'
      }
    ],
    plugins: [
      peerDepsExternal(),
      json(),
      nodeResolve({ extensions, browser: true }),
      commonjs(),
      typescript(),
      // terser(),
      postcss(),
      alias({
        entries: getAlias
      })
    ]
  },
  {
    input: 'src/index.ts',
    output: [
      {
        file: './dist/types.d.ts',
        format: 'es'
      }
    ],
    plugins: [
      dts.default(),
      alias({
        entries: getAlias
      })
    ],
    external: [/\.(sass|scss|css)$/]
  }
]
