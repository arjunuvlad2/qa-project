import { test, expect } from '@playwright/test';

test('example placeholder test', async ({ page }) => {
  await page.goto('https://example.com');
  await expect(page).toHaveTitle(/Example/);
});
