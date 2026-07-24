import { expect, test } from '@playwright/test';

test.describe('SauceDemo login journey', () => {
  test('allows a user to log in with valid credentials', async ({ page }) => {
    const username = 'standard_user';
    const password = 'secret_sauce';

    await page.goto('https://www.saucedemo.com', { waitUntil: 'domcontentloaded' });

    await expect(page).toHaveTitle(/Swag Labs/);
    await expect(page.locator('[data-test="username"]')).toBeVisible();

    await page.locator('[data-test="username"]').fill(username);
    await page.locator('[data-test="password"]').fill(password);
    await page.locator('[data-test="login-button"]').click();

    await expect(page).toHaveURL(/inventory\.html/);
    await expect(page.getByText('Products', { exact: true })).toBeVisible();
    await expect(page.locator('[data-test="inventory-container"]')).toBeVisible();
  });
});
