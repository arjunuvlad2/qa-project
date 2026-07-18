import { test, expect } from '@playwright/test';

test('successful login with valid username and password', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  // Prefer role/label/placeholder selectors before falling back to CSS
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL(/\/inventory\.html$/);
  await expect(page.locator('.title')).toHaveText('Products');
});
