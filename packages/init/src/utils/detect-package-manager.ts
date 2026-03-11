import { existsSync } from 'node:fs'
import path from 'node:path'

export type PackageManager = 'pnpm' | 'yarn' | 'npm'

export function detectPackageManager(cwd: string = process.cwd()): PackageManager {
  if (existsSync(path.join(cwd, 'pnpm-lock.yaml'))) return 'pnpm'
  if (existsSync(path.join(cwd, 'yarn.lock'))) return 'yarn'
  if (existsSync(path.join(cwd, 'package-lock.json'))) return 'npm'
  return 'npm'
}
