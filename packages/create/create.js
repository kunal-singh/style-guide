#!/usr/bin/env node
import { cpSync, readFileSync, writeFileSync, chmodSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createInterface } from "node:readline";

const TEMPLATES_DIR = join(fileURLToPath(import.meta.url), "../templates");
const PRESETS = ["server", "library"];

async function ask(question) {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((res) =>
    rl.question(question, (ans) => {
      rl.close();
      res(ans.trim());
    }),
  );
}

const PRESET_MAP = {
  server: "@kunal-singh/typescript-config/server",
  library: "@kunal-singh/typescript-config/library",
};

const projectName = process.argv[2] ?? (await ask("Project name: "));
if (!projectName) {
  console.error("Project name is required");
  process.exit(1);
}

const presetInput = process.argv[3] ?? (await ask(`Preset (${PRESETS.join("/")}): `));
const preset = PRESETS.find((p) => p === presetInput);
if (!preset) {
  console.error(`Unknown preset "${presetInput}". Valid: ${PRESETS.join(", ")}`);
  process.exit(1);
}

const targetDir = resolve(process.cwd(), projectName);
if (existsSync(targetDir)) {
  console.error(`Directory "${projectName}" already exists`);
  process.exit(1);
}

cpSync(join(TEMPLATES_DIR, preset), targetDir, { recursive: true });

for (const file of ["package.json", "tsconfig.json"]) {
  const p = join(targetDir, file);
  writeFileSync(
    p,
    readFileSync(p, "utf8")
      .replaceAll("{{NAME}}", projectName)
      .replaceAll("{{PRESET}}", PRESET_MAP[preset]),
  );
}

chmodSync(join(targetDir, "scripts/check-branch-name.sh"), 0o755);

console.log(`\nCreated ${projectName} (${preset})`);
console.log(`\n  cd ${projectName}\n  pnpm install`);
