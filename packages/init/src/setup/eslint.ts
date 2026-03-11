import { writeFile } from "node:fs/promises";
import path from "node:path";

export async function setupEslint(cwd: string = process.cwd()): Promise<void> {
  const content = `import config from '@kunal-singh/eslint-config/server'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['**/*.config.js', '**/*.config.ts', 'scripts/**', 'dist/**'] },
  ...config,
  {
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
)
`;

  await writeFile(path.join(cwd, "eslint.config.js"), content, "utf-8");
}
