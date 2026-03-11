import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

const COMMITLINT_CONFIG = `import baseConfig from '@kunal-singh/commitlint-config'

/** @type {import('@commitlint/types').UserConfig} */
const config = {
  ...baseConfig,
  plugins: [
    {
      rules: {
        'github-issue-reference': (parsed) => {
          const { header } = parsed
          const valid = /^[a-z]+\\/\\d+-/.test(header ?? '')
          return [valid, 'Commit subject must reference a GitHub issue, e.g. feat/123-my-feature']
        },
      },
    },
  ],
  rules: {
    ...baseConfig.rules,
    'github-issue-reference': [2, 'always'],
  },
}

export default config
`

const BRANCH_CHECK_SCRIPT = `#!/usr/bin/env bash
set -euo pipefail

BRANCH=$(git symbolic-ref --short HEAD 2>/dev/null || echo "")

# Exempt protected branches
case "$BRANCH" in
  main|master|develop|release/*|hotfix/*)
    exit 0
    ;;
esac

# Validate pattern: <type>/<issue>-<description>
if ! echo "$BRANCH" | grep -qE '^[a-z]+/[0-9]+-[a-z0-9-]+$'; then
  echo "Branch name '$BRANCH' does not match required pattern: <type>/<issue>-<description>"
  echo "Examples: feat/123-add-login, fix/456-null-pointer"
  exit 1
fi
`

export async function setupCommitlint(cwd: string = process.cwd()): Promise<void> {
  await writeFile(path.join(cwd, 'commitlint.config.js'), COMMITLINT_CONFIG, 'utf-8')

  const scriptsDir = path.join(cwd, 'scripts')
  await mkdir(scriptsDir, { recursive: true })

  await writeFile(path.join(scriptsDir, 'check-branch-name.sh'), BRANCH_CHECK_SCRIPT, {
    encoding: 'utf-8',
    mode: 0o755,
  })
}
