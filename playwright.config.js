const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,
  fullyParallel: false,
  reporter: [['html', { outputFolder: 'playwright-report', open: 'never' }], ['list']],
  outputDir: 'test-results',
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    baseURL: 'https://playwright.dev/'
  }
});
