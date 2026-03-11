#!/usr/bin/env node
import pc from 'picocolors'
import prompts from 'prompts'
import { detectPackageManager } from './utils/detect-package-manager.js'
import { setupTypescript } from './setup/typescript.js'
import { setupEslint } from './setup/eslint.js'
import { setupPrettier } from './setup/prettier.js'
import { setupCommitlint } from './setup/commitlint.js'
import { setupLefthook } from './setup/lefthook.js'
import { setupLintStaged } from './setup/lint-staged.js'
import { setupTsup } from './setup/tsup.js'

type Preset = 'server' | 'library' | 'mcp'

const COMING_SOON = new Set(['react', 'nextjs'])

async function main(): Promise<void> {
  console.log(pc.bold('\n@kunal-singh/init\n'))

  const { preset } = await prompts({
    type: 'select',
    name: 'preset',
    message: 'Select a preset',
    choices: [
      { title: 'Server', value: 'server' },
      { title: 'Library', value: 'library' },
      { title: 'MCP', value: 'mcp' },
      { title: 'React (coming soon)', value: 'react' },
      { title: 'Next.js (coming soon)', value: 'nextjs' },
    ],
  })

  if (!preset) {
    console.log(pc.yellow('Cancelled.'))
    process.exit(0)
  }

  if (COMING_SOON.has(preset)) {
    console.log(pc.yellow(`The '${preset}' preset is not yet available.`))
    process.exit(0)
  }

  const pm = detectPackageManager()

  console.log('\n' + pc.bold('Files that will be written:'))
  console.log('  tsconfig.json')
  console.log('  eslint.config.js')
  console.log('  prettier.config.js')
  console.log('  commitlint.config.js')
  console.log('  scripts/check-branch-name.sh')
  console.log('  lefthook.yml')
  console.log('  lint-staged.config.js')
  console.log('  tsup.config.ts')
  console.log('\n' + pc.bold('package.json changes:'))
  console.log('  scripts: prepare, build, dev, typecheck, clean')
  console.log('  devDependencies: style guide packages + tooling')
  console.log('  main, module, types, exports, files fields\n')

  const { confirmed } = await prompts({
    type: 'confirm',
    name: 'confirmed',
    message: 'Proceed?',
    initial: true,
  })

  if (!confirmed) {
    console.log(pc.yellow('Cancelled.'))
    process.exit(0)
  }

  const cwd = process.cwd()

  await setupTypescript(preset as Preset, cwd)
  console.log(pc.green('✓') + ' tsconfig.json')

  await setupEslint(cwd)
  console.log(pc.green('✓') + ' eslint.config.js')

  await setupPrettier(cwd)
  console.log(pc.green('✓') + ' prettier.config.js')

  await setupCommitlint(cwd)
  console.log(pc.green('✓') + ' commitlint.config.js + scripts/check-branch-name.sh')

  await setupLefthook(cwd)
  console.log(pc.green('✓') + ' lefthook.yml')

  await setupLintStaged(cwd)
  console.log(pc.green('✓') + ' lint-staged.config.js')

  await setupTsup(cwd)
  console.log(pc.green('✓') + ' tsup.config.ts')

  console.log(
    '\n' +
      pc.bold(pc.green('Done!')) +
      ` Run ${pc.cyan(`${pm} install`)} to install dependencies.\n`,
  )
}

main().catch((err: unknown) => {
  console.error(pc.red('Error:'), err)
  process.exit(1)
})
