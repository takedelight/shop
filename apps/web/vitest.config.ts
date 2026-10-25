import tsconfigPaths from "vite-tsconfig-paths";
// vitest.config.ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    // Вмикає глобальні методи describe, it, expect без їх імпорту в кожному файлі
    globals: true,
    // Середовище для юніт-тестів (чистий Node/Bun)
    environment: "node",
    // Якщо тестуєте UI-компоненти, можна перемкнути на "jsdom"
    // environment: "jsdom",
    include: ["**/*.test.ts", "**/*.test.tsx", "**/*.spec.ts", "**/*.spec.tsx"],
  },
});
