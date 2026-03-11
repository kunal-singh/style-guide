/** @type {import('lint-staged').Config} */
const config = {
  "*.{ts,js}": ["eslint --fix", "prettier --write"],
  "*.{json,md,yml,yaml}": ["prettier --write"],
};

export default config;
