import postcssPresetEnv from 'postcss-preset-env'
import autoprefixer from 'autoprefixer'
import PostcssModulesPlugin from 'postcss-modules'
import stringHash from 'string-hash'

export default {
  // plugins: [postcssPresetEnv(), autoprefixer(), PostcssModulesPlugin()],
  // autoModules: false,
  // onlyModules: false,
  // extensions: ['.scss'],
  // use: ['sass'],
  // minimize: true,
  // sourceMap: false,
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
}
