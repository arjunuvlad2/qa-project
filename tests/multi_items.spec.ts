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

  const bikeLightCard = page.locator('.inventory_item').filter({ hasText: 'Sauce Labs Bike Light' });
  await bikeLightCard.getByRole('button', { name: 'Add to cart' }).click();

  const boltShirtCard = page.locator('.inventory_item').filter({ hasText: 'Sauce Labs Bolt T-Shirt' });
  await boltShirtCard.getByRole('button', { name: 'Add to cart' }).click();

  await page.locator('.shopping_cart_link').click();
  const boltShirtCartItem = page.locator('.cart_item').filter({ hasText: 'Sauce Labs Bolt T-Shirt' });
  await boltShirtCartItem.getByRole('button', { name: 'Remove' }).click();

  await expect(page.locator('.shopping_cart_badge')).toHaveText('2');
  await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
  await expect(page.getByText('Sauce Labs Bike Light')).toBeVisible();
});