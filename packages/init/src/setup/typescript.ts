import { writeFile } from 'node:fs/promises'
import path from 'node:path'

type Preset = 'server' | 'library' | 'mcp'

const PRESET_MAP: Record<Preset, string> = {
  server: '@kunal-singh/typescript-config/server',
  mcp: '@kunal-singh/typescript-config/server',
  library: '@kunal-singh/typescript-config/library',
}

export async function setupTypescript(preset: Preset, cwd: string = process.cwd()): Promise<void> {
  const config = {
    extends: PRESET_MAP[preset],
    include: ['src'],
    exclude: ['node_modules', 'dist', '*.config.js'],
  }

  await writeFile(
    path.join(cwd, 'tsconfig.json'),
    JSON.stringify(config, null, 2) + '\n',
    'utf-8',
  )
}
