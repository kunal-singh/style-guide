import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const LINT_STAGED_CONFIG = `/** @type {import('lint-staged').Config} */
const config = {
  '*.{ts,js}': ['eslint --fix', 'prettier --write'],
  '*.{json,md,yml,yaml}': ['prettier --write'],
}

export default config
`

export async function setupLintStaged(cwd: string = process.cwd()): Promise<void> {
  await writeFile(path.join(cwd, 'lint-staged.config.js'), LINT_STAGED_CONFIG, 'utf-8')

  const pkgPath = path.join(cwd, 'package.json')
  const raw = await readFile(pkgPath, 'utf-8')
  const pkg = JSON.parse(raw) as Record<string, unknown>

  const scripts = (pkg['scripts'] as Record<string, string> | undefined) ?? {}
  scripts['prepare'] = 'lefthook install'
  pkg['scripts'] = scripts

  await writeFile(pkgPath, JSON.stringify(pkg, null, 2) + '\n', 'utf-8')
}
