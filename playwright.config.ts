import { defineConfig } from "@playwright/test";

const port = 4173;
const baseURL = `http://127.0.0.1:${port}`;
const slowMo = Number(process.env.PLAYWRIGHT_SLOW_MO || 0);

export default defineConfig({
  testDir: "./tests/e2e",
  tsconfig: "./tsconfig.json",
  outputDir: "./.artifacts/test-results",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [["list"], ["html", { open: "never", outputFolder: ".artifacts/playwright-report" }]],
  use: {
    baseURL,
    viewport: { width: 1440, height: 900 },
    launchOptions: {
      args: ["--start-maximized"],
      slowMo
    },
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure"
  },
  webServer: {
    command: `node server.js ${port}`,
    port,
    reuseExistingServer: !process.env.CI,
    timeout: 120000
  }
});
