import { test, expect } from '@playwright/test';

test('shows an error message for invalid login credentials', async ({ page }) => {
  // Step 1: Open the login page.
  await page.goto('https://www.saucedemo.com/');
  await expect(page.locator('#user-name')).toBeVisible();
  await expect(page.locator('#password')).toBeVisible();

  // Step 2: Enter invalid credentials.
  await page.locator('#user-name').fill('standard_user');
  await page.locator('#password').fill('wrong_password');

  // Step 3: Click the login button.
  await page.locator('#login-button').click();

  // Step 4: Verify the error message is displayed.
  await expect(page.locator('[data-test="error"]')).toContainText(/username and password do not match/i);
});

test('logs in successfully with valid credentials', async ({ page }) => {
  // Step 1: Open the login page.
  await page.goto('https://www.saucedemo.com/');
  await expect(page.locator('#user-name')).toBeVisible();
  await expect(page.locator('#password')).toBeVisible();

  // Step 2: Enter valid credentials.
  await page.locator('#user-name').fill('standard_user');
  await page.locator('#password').fill('secret_sauce');

  // Step 3: Click the login button.
  await page.locator('#login-button').click();

  // Step 4: Verify the inventory page is displayed.
  await expect(page).toHaveURL(/\/inventory\.html$/);
  await expect(page.locator('.inventory_list')).toBeVisible();
});

test('shows the locked out user error message', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await expect(page.locator('#user-name')).toBeVisible();
  await expect(page.locator('#password')).toBeVisible();

  await page.locator('#user-name').fill('locked_out_user');
  await page.locator('#password').fill('secret_sauce');
  await page.locator('#login-button').click();

  await expect(
    page.getByText('Epic sadface: Sorry, this user has been locked out.')
  ).toBeVisible();
});
