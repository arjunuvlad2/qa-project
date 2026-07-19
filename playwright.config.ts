import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: 'test',
  timeout: 30_000,
  expect: {
    timeout: 5_000,
  },
  use: {
    headless: true,
    baseURL: process.env.BASE_URL ?? 'http://localhost:3000',
    ignoreHTTPSErrors: true,
    actionTimeout: 10_000,
    video: 'on-first-retry',
  },
  reporter: [['list'], ['html', { outputFolder: 'playwright-report', open: 'never' }]],
  webServer: {
    command: 'node server.js',
    port: 3000,
    reuseExistingServer: true,
    timeout: 30_000,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
