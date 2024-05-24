import 'module-alias/register'
import { addAliases } from 'module-alias'

addAliases({
  '@': `${__dirname}`,
  '@hooks': `${__dirname}/hooks`,
  '@mocks': `${__dirname}/mocks`,
  '@components': `${__dirname}/components`,
  '@utils': `${__dirname}/utils`
})
