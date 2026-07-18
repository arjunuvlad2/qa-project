import { test, expect } from '@playwright/test';

test('logs in and adds the first product to the cart', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: /login/i }).click();

  await expect(page).toHaveURL(/inventory\.html$/i);

  const firstAddToCart = page.getByRole('button', { name: 'Add to cart' }).first();
  await expect(firstAddToCart).toBeVisible();
  await firstAddToCart.click();

  await page.getByRole('link', { name: 'Sauce Labs Backpack' }).click();
});