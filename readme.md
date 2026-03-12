# style-guide

Config packages I use across TypeScript projects. Either scaffold something new with `@kunal-singh/create`, or grab individual packages.

## Packages

| Package                          | Description                                                 |
| -------------------------------- | ----------------------------------------------------------- |
| `@kunal-singh/eslint-config`     | ESLint v9 flat config (base, server, react, nextjs presets) |
| `@kunal-singh/prettier-config`   | Prettier config                                             |
| `@kunal-singh/typescript-config` | TypeScript configs (base, server, library, react, nextjs)   |
| `@kunal-singh/commitlint-config` | commitlint conventional commits config                      |
| `@kunal-singh/create`            | Scaffolds a new project with all of the above               |

## Create a project

```sh
npm create @kunal-singh@latest <project-name> [server|library|react|nextjs]
```

For individual package usage, see each package's README.
