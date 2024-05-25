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
import 'module-alias/register'

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
        entries: [
          {
            find: '@styles',
            replacement: __dirname + '/src/styles'
          }
        ]
      })
    ]
  },
  {
    input: 'src/types.d.ts',
    output: [
      {
        file: './dist/types.d.ts',
        format: 'es'
      }
    ],
    plugins: [dts.default()]
  }
]
