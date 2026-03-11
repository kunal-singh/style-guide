import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const TSUP_CONFIG = `import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: true,
  treeshake: true,
})
`

const STYLE_GUIDE_DEPS: Record<string, string> = {
  '@kunal-singh/typescript-config': 'latest',
  '@kunal-singh/eslint-config': 'latest',
  '@kunal-singh/prettier-config': 'latest',
  '@kunal-singh/commitlint-config': 'latest',
  '@commitlint/cli': 'latest',
  '@commitlint/config-conventional': 'latest',
  eslint: 'latest',
  lefthook: 'latest',
  'lint-staged': 'latest',
  prettier: 'latest',
  tsup: 'latest',
  typescript: 'latest',
  'typescript-eslint': 'latest',
}

export async function setupTsup(cwd: string = process.cwd()): Promise<void> {
  await writeFile(path.join(cwd, 'tsup.config.ts'), TSUP_CONFIG, 'utf-8')

  const pkgPath = path.join(cwd, 'package.json')
  const raw = await readFile(pkgPath, 'utf-8')
  const pkg = JSON.parse(raw) as Record<string, unknown>

  pkg['main'] = './dist/index.cjs'
  pkg['module'] = './dist/index.js'
  pkg['types'] = './dist/index.d.ts'
  pkg['exports'] = {
    '.': {
      import: { types: './dist/index.d.ts', default: './dist/index.js' },
      require: { types: './dist/index.d.cts', default: './dist/index.cjs' },
    },
  }

  const files = (pkg['files'] as string[] | undefined) ?? []
  if (!files.includes('dist')) files.push('dist')
  pkg['files'] = files

  const scripts = (pkg['scripts'] as Record<string, string> | undefined) ?? {}
  scripts['build'] = 'tsup'
  scripts['dev'] = 'tsup --watch'
  scripts['typecheck'] = 'tsc --noEmit'
  scripts['clean'] = 'rm -rf dist'
  pkg['scripts'] = scripts

  const devDeps = (pkg['devDependencies'] as Record<string, string> | undefined) ?? {}
  for (const [dep, version] of Object.entries(STYLE_GUIDE_DEPS)) {
    devDeps[dep] = version
  }
  pkg['devDependencies'] = devDeps

  await writeFile(pkgPath, JSON.stringify(pkg, null, 2) + '\n', 'utf-8')
}
