import { fileURLToPath } from "node:url";
import { defineConfig } from "oxlint";

const uiGlobalsCss = fileURLToPath(new URL("./apps/web/src/app/globals.css", import.meta.url));

export default defineConfig({
  categories: {
    correctness: "error",
    perf: "warn",
    suspicious: "warn",
  },
  settings: {
    react: {
      version: "19.2",
    },
    tailwindcss: {
      cssConfigPath: uiGlobalsCss,
    },
  },
  ignorePatterns: [
    "**/node_modules/**",
    "**/.next/**",
    "**/.expo/**",
    "**/dist/**",
    "**/build/**",
    "**/.turbo/**",
    "apps/web/src/shared/ui/**",
    "packages/ui/src/**",
    "apps/web/drizzle/**",
    "packages/db/drizzle/**",
  ],
  overrides: [
    {
      files: ["apps/web/**"],
      plugins: [
        "react",
        "nextjs",
        "typescript",
        "import",
        "jsx-a11y",
        "unicorn",
        "oxc",
        "react-perf",
        "promise",
        "vitest",
      ],
      env: {
        builtin: true,
        browser: true,
        node: true,
      },
      jsPlugins: [
        { name: "tailwindcss", specifier: "eslint-plugin-tailwindcss" },
        { name: "drizzle", specifier: "eslint-plugin-drizzle" },
      ],
      rules: {
        "nextjs/google-font-display": "error",
        "nextjs/google-font-preconnect": "error",
        "nextjs/inline-script-id": "error",
        "nextjs/next-script-for-ga": "error",
        "nextjs/no-assign-module-variable": "error",
        "nextjs/no-async-client-component": "error",
        "nextjs/no-before-interactive-script-outside-document": "error",
        "nextjs/no-css-tags": "error",
        "nextjs/no-document-import-in-page": "error",
        "nextjs/no-duplicate-head": "error",
        "nextjs/no-head-element": "error",
        "nextjs/no-head-import-in-document": "error",
        "nextjs/no-html-link-for-pages": "error",
        "nextjs/no-script-component-in-head": "error",
        "nextjs/no-styled-jsx-in-document": "error",
        "nextjs/no-sync-scripts": "error",
        "nextjs/no-title-in-document-head": "error",
        "nextjs/no-typos": "error",
        "nextjs/no-unwanted-polyfillio": "error",
        "nextjs/no-page-custom-font": "error",
        "nextjs/no-img-element": "error",

        "import/no-unassigned-import": "off",
        "import/no-self-import": "error",
        "import/no-cycle": "warn",
        "import/no-duplicates": "warn",
        "import/no-anonymous-default-export": "warn",

        "react/react-in-jsx-scope": "off",
        "react/rules-of-hooks": "error",
        "react/exhaustive-deps": "warn",
        "react/jsx-key": "error",
        "react/jsx-no-duplicate-props": "error",
        "react/jsx-no-undef": "error",
        "react/jsx-no-useless-fragment": "warn",
        "react/no-children-prop": "error",
        "react/no-danger-with-children": "error",
        "react/no-direct-mutation-state": "error",
        "react/no-find-dom-node": "error",
        "react/no-is-mounted": "error",
        "react/no-render-return-value": "error",
        "react/no-string-refs": "error",
        "react/no-unescaped-entities": "error",
        "react/no-unknown-property": "error",
        "react/require-render-return": "error",
        "react/void-dom-elements-no-children": "error",

        "tailwindcss/no-contradicting-classname": "error",
        "tailwindcss/important-modifier-suffix": "warn",
        "tailwindcss/enforces-shorthand": "warn",
        "tailwindcss/enforces-negative-arbitrary-values": "warn",
        "tailwindcss/no-arbitrary-value": "warn",

        "drizzle/enforce-delete-with-where": ["error", { drizzleObjectName: ["db"] }],
        "drizzle/enforce-update-with-where": ["error", { drizzleObjectName: ["db"] }],
      },
    },

    {
      files: ["apps/mobile/**"],
      plugins: ["react", "typescript", "import", "unicorn", "oxc", "react-perf", "promise"],
      env: {
        builtin: true,
      },
      rules: {
        "react/react-in-jsx-scope": "off",
        "react/rules-of-hooks": "error",
        "react/exhaustive-deps": "warn",
        "react/jsx-key": "error",
        "react/jsx-no-duplicate-props": "error",
        "react/jsx-no-undef": "error",
        "import/no-self-import": "error",
        "import/no-duplicates": "warn",
      },
    },

    {
      files: ["packages/**"],
      plugins: ["typescript", "import", "unicorn", "oxc"],
      env: {
        builtin: true,
        node: true,
      },
      jsPlugins: [{ name: "drizzle", specifier: "eslint-plugin-drizzle" }],
      rules: {
        "typescript/no-non-null-assertion": "error",
        "import/no-self-import": "error",
        "import/no-duplicates": "warn",
        "drizzle/enforce-delete-with-where": ["error", { drizzleObjectName: ["db"] }],
        "drizzle/enforce-update-with-where": ["error", { drizzleObjectName: ["db"] }],
      },
    },

    {
      files: ["**/*.test.ts", "**/*.test.tsx", "**/tests/**"],
      plugins: ["vitest"],
      rules: {
        "typescript/no-non-null-assertion": "off",
      },
    },
  ],
});
