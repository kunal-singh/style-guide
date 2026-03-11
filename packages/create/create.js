#!/usr/bin/env node
import { cpSync, mkdirSync, readFileSync, writeFileSync, chmodSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createInterface } from "node:readline";
import { execSync } from "node:child_process";

const TEMPLATES_DIR = join(fileURLToPath(import.meta.url), "../templates");
const PRESETS = ["server", "library"];

const CHECK_BRANCH_SCRIPT = `\
#!/usr/bin/env bash
set -euo pipefail

BRANCH=$(git symbolic-ref --short HEAD 2>/dev/null || echo "")

# Exempt protected branches
case "$BRANCH" in
  main|master|develop|release/*|hotfix/*|changeset-release/*)
    exit 0
    ;;
esac

# Validate pattern: <type>/<issue>-<description>
if ! echo "$BRANCH" | grep -qE '^[a-z]+/[0-9]+-[a-z0-9-]+$'; then
  echo "Branch name '$BRANCH' does not match required pattern: <type>/<issue>-<description>"
  echo "Examples: feat/123-add-login, fix/456-null-pointer"
  exit 1
fi
`;

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

execSync("git init", { cwd: targetDir, stdio: "ignore" });

mkdirSync(join(targetDir, "src"), { recursive: true });
writeFileSync(join(targetDir, "src", "index.ts"), "export {};\n");

const scriptsDir = join(targetDir, "scripts");
mkdirSync(scriptsDir, { recursive: true });
const checkBranchPath = join(scriptsDir, "check-branch-name.sh");
writeFileSync(checkBranchPath, CHECK_BRANCH_SCRIPT);
chmodSync(checkBranchPath, 0o755);

console.log(`\nCreated ${projectName} (${preset})`);
console.log(`\n  cd ${projectName}\n  pnpm install`);
