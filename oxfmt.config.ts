import { defineConfig } from "oxfmt";

export default defineConfig({
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: false,
  trailingComma: "all",
  bracketSpacing: true,
  arrowParens: "always",
  endOfLine: "lf",

  ignorePatterns: [
    "**/node_modules/**",
    "**/.next/**",
    "**/.expo/**",
    "**/dist/**",
    "**/build/**",
    "**/.turbo/**",
    "bun.lockb",
    "bun.lock",
    "apps/web/src/shared/ui/**",
    "apps/web/drizzle/**",
  ],

  overrides: [
    {
      files: ["apps/web/**/*.{ts,tsx,js,jsx}"],
      options: {
        sortImports: {
          groups: [
            "type-import",
            ["value-builtin", "value-external"],
            "type-internal",
            "value-internal",
            ["type-parent", "type-sibling", "type-index"],
            ["value-parent", "value-sibling", "value-index"],
            "unknown",
          ],
        },
        sortTailwindcss: {
          stylesheet: "packages/ui/src/styles/globals.css",
          functions: ["clsx", "cn", "cva"],
          preserveWhitespace: true,
        },
      },
    },

    {
      files: ["apps/mobile/**/*.{ts,tsx,js,jsx}"],
      options: {
        sortImports: {
          groups: [
            "type-import",
            ["value-builtin", "value-external"],
            "type-internal",
            "value-internal",
            ["type-parent", "type-sibling", "type-index"],
            ["value-parent", "value-sibling", "value-index"],
            "unknown",
          ],
        },
      },
    },

    {
      files: ["packages/**/*.{ts,tsx,js,jsx}"],
      options: {
        sortImports: {
          groups: [
            "type-import",
            ["value-builtin", "value-external"],
            "type-internal",
            "value-internal",
            ["type-parent", "type-sibling", "type-index"],
            ["value-parent", "value-sibling", "value-index"],
            "unknown",
          ],
        },
      },
    },
  ],
});
