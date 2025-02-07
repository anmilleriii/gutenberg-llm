import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "happy-dom",
    include: ["app/**/*.test.{ts,tsx}", "lib/**/*.test.{ts,tsx}"],
  },
});
