import { test, expect } from '@playwright/test';

async function login(page: any) {
  await page.goto('https://www.saucedemo.com/');
  await page.getByRole('textbox', { name: /username/i }).fill('standard_user');
  await page.getByRole('textbox', { name: /password/i }).fill('secret_sauce');
  await page.getByRole('button', { name: /login/i }).click();
}

async function addProduct(page: any, productName: string) {
  const productCard = page.locator('.inventory_item').filter({ hasText: productName });
  await productCard.getByRole('button', { name: /add to cart/i }).click();
}

async function removeProduct(page: any, productName: string) {
  const productCard = page.locator('.inventory_item').filter({ hasText: productName });
  await productCard.getByRole('button', { name: /remove/i }).click();
}

test('logs in successfully to SauceDemo', async ({ page }) => {
  await login(page);

  await expect(page).toHaveURL(/\/inventory\.html$/);
  await expect(page.locator('.inventory_list')).toBeVisible();
});

test('adds an item to the cart after a successful login', async ({ page }) => {
  await login(page);

  await addProduct(page, 'Sauce Labs Backpack');

  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  await expect(page.locator('.inventory_item').filter({ hasText: 'Sauce Labs Backpack' }).getByRole('button', { name: /remove/i })).toBeVisible();
});

test('logs out after adding an item to the cart', async ({ page }) => {
  await login(page);

  await addProduct(page, 'Sauce Labs Backpack');
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

  await page.getByRole('button', { name: /open menu/i }).click();
  await page.getByRole('link', { name: /logout/i }).click();

  await expect(page).toHaveURL(/https:\/\/www\.saucedemo\.com\/$/);
  await expect(page.getByRole('button', { name: /login/i })).toBeVisible();
});

test('adds multiple items, removes one, and keeps the correct products', async ({ page }) => {
  await login(page);

  await addProduct(page, 'Sauce Labs Backpack');
  await addProduct(page, 'Sauce Labs Bike Light');
  await addProduct(page, 'Sauce Labs Bolt T-Shirt');

  await expect(page.locator('.shopping_cart_badge')).toHaveText('3');

  await removeProduct(page, 'Sauce Labs Backpack');

  await expect(page.locator('.shopping_cart_badge')).toHaveText('2');
  await expect(page.getByText('Sauce Labs Bike Light')).toBeVisible();
  await expect(page.locator('.inventory_item').filter({ hasText: 'Sauce Labs Bolt T-Shirt' }).locator('[data-test="inventory-item-name"]')).toBeVisible();
});