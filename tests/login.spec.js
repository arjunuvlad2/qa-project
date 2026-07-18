const { test, expect } = require('@playwright/test');

test('Business Rule 1 - valid username and password should allow login', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  // Arrange: valid credentials (standard Sauce Demo test account)
  const username = 'standard_user';
  const password = 'secret_sauce';

  // Act: fill and submit
  await page.fill('#user-name', username);
  await page.fill('#password', password);
  await page.click('#login-button');

  // Assert: user lands on the inventory page and product list is visible
  await expect(page).toHaveURL(/.*inventory.html/);
  await expect(page.locator('.inventory_list')).toBeVisible();
});
