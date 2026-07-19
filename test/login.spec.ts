import { test, expect } from '@playwright/test';

const BASE_URL = process.env.BASE_URL ?? 'http://localhost:3000';
const LOGIN_PAGE = `${BASE_URL}/login`;

const selectors = {
  username: 'input[name="username"], input#username',
  password: 'input[name="password"], input#password',
  loginButton: 'button[type="submit"], button:has-text("Login")',
  errorMessage: '#message.error, .error, .error-message, [role="alert"]',
  dashboardHeading: 'h1:has-text("Dashboard")',
  usernameRequired: 'text=Username is required',
  passwordRequired: 'text=Password is required',
};

test.describe('Login', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(LOGIN_PAGE);
  });

  test('should log in successfully with valid credentials', async ({ page }) => {
    await page.fill(selectors.username, 'valid-user');
    await page.fill(selectors.password, 'ValidPassword123');
    await page.click(selectors.loginButton);

    await expect(page).toHaveURL(/dashboard/);
    await expect(page.locator(selectors.dashboardHeading)).toBeVisible();
  });

  test('should display an error message when password is invalid', async ({ page }) => {
    await page.fill(selectors.username, 'valid-user');
    await page.fill(selectors.password, 'wrong-password');
    await page.click(selectors.loginButton);

    await expect(page.locator(selectors.errorMessage)).toBeVisible();
  });

  test('should display an error message when username is invalid', async ({ page }) => {
    await page.fill(selectors.username, 'invalid-user');
    await page.fill(selectors.password, 'ValidPassword123');
    await page.click(selectors.loginButton);

    await expect(page.locator(selectors.errorMessage)).toBeVisible();
  });

  test('should display a username required message when username is blank', async ({ page }) => {
    await page.fill(selectors.password, 'ValidPassword123');
    await page.click(selectors.loginButton);

    await expect(page.locator(selectors.usernameRequired)).toBeVisible();
  });

  test('should display a password required message when password is blank', async ({ page }) => {
    await page.fill(selectors.username, 'valid-user');
    await page.click(selectors.loginButton);

    await expect(page.locator(selectors.passwordRequired)).toBeVisible();
  });
});
