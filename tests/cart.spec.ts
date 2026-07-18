import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.getByPlaceholder('Username').click();
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  const backpackCard = page.locator('.inventory_item').filter({ hasText: 'Sauce Labs Backpack' });
  await backpackCard.getByRole('button', { name: 'Add to cart' }).click();

  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  await expect(backpackCard.getByRole('button', { name: 'Remove' })).toBeVisible();
});