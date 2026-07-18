import { test, expect } from '@playwright/test';

test('cart add and remove flow (login uses placeholder/role selectors)', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  // Prefer placeholder/role before falling back to data-test/CSS
  await page.getByPlaceholder('Username').click();
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

  // Step 7 assertions: cart badge and button change
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  await expect(page.getByRole('button', { name: 'Remove' })).toBeVisible();
  await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').click();
  await page.locator('[data-test="remove-sauce-labs-bolt-t-shirt"]').click();
  await page.locator('[data-test="remove-sauce-labs-fleece-jacket"]').click();
  await page.getByRole('button', { name: 'Open Menu' }).click();
  await page.locator('[data-test="logout-sidebar-link"]').click();
});