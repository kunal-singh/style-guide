import { writeFile } from 'node:fs/promises'
import path from 'node:path'

export async function setupEslint(cwd: string = process.cwd()): Promise<void> {
  const content = `import config from '@kunal-singh/eslint-config/server'\n\nexport default config\n`

  await writeFile(path.join(cwd, 'eslint.config.js'), content, 'utf-8')
}
