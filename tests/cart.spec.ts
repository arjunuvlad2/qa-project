import { expect, test, type Page } from '@playwright/test';

async function login(page: Page, username: string, password: string) {
  await page.goto('https://www.saucedemo.com', { waitUntil: 'domcontentloaded' });
  await page.locator('[data-test="username"]').fill(username);
  await page.locator('[data-test="password"]').fill(password);
  await page.locator('[data-test="login-button"]').click();
}

test.describe('SauceDemo cart journey', () => {
  test('adds a backpack to cart, shows badge 1, and logs out', async ({ page }) => {
    await login(page, 'standard_user', 'secret_sauce');

    await expect(page).toHaveURL(/inventory\.html/);
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
    await expect(page.getByRole('button', { name: 'Remove' })).toBeVisible();

    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page).toHaveURL(/cart\.html/);
    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();

    await page.locator('#react-burger-menu-btn').click();
    await page.getByRole('link', { name: 'Logout' }).click();

    await expect(page).toHaveURL(/https:\/\/www\.saucedemo\.com\//);
  });

  test('adds multiple products, removes one, and keeps the correct badge count', async ({ page }) => {
    await login(page, 'standard_user', 'secret_sauce');

    await expect(page).toHaveURL(/inventory\.html/);
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();

    await expect(page.locator('.shopping_cart_badge')).toHaveText('3');

    await page.locator('[data-test="remove-sauce-labs-backpack"]').click();

    await expect(page.locator('.shopping_cart_badge')).toHaveText('2');
   // await expect(page.getByText('Sauce Labs Backpack')).toBeHidden();
    await expect(page.getByText('Sauce Labs Bike Light')).toBeVisible();
    //await expect(page.getByText('Sauce Labs Bolt T-Shirt')).toBeVisible();
  });

  test('shows a locked-out message for a locked user', async ({ page }) => {
    await login(page, 'locked_out_user', 'secret_sauce');

    await expect(
      page.getByText('Epic sadface: Sorry, this user has been locked out.')
    ).toBeVisible();
  });
});