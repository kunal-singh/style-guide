import { writeFile } from 'node:fs/promises'
import path from 'node:path'

export async function setupPrettier(cwd: string = process.cwd()): Promise<void> {
  const content = `export { default } from '@kunal-singh/prettier-config'\n`

  await writeFile(path.join(cwd, 'prettier.config.js'), content, 'utf-8')
}
