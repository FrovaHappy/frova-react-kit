import { defineWorkspace } from 'vitest/config'
import pkg from './package.json'
export default defineWorkspace(pkg.workspaces)
