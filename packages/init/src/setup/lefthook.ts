import { writeFile } from 'node:fs/promises'
import path from 'node:path'

const LEFTHOOK_CONFIG = `pre-commit:
  commands:
    lint-staged:
      run: npx lint-staged

commit-msg:
  commands:
    commitlint:
      run: npx --no -- commitlint --edit {1}

pre-push:
  commands:
    check-branch-name:
      run: bash scripts/check-branch-name.sh
`

export async function setupLefthook(cwd: string = process.cwd()): Promise<void> {
  await writeFile(path.join(cwd, 'lefthook.yml'), LEFTHOOK_CONFIG, 'utf-8')
}
