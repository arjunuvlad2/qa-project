import { test } from '@playwright/test';
import { LoginPage } from './page-objects/login.page';

const VALID_USERNAME = 'standard_user';
const VALID_PASSWORD = 'secret_sauce';
const INVALID_USERNAME = 'invalid_user';
const INVALID_PASSWORD = 'wrong_password';

test.describe('Sauce Demo login', () => {
  test('should log in with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.expectLoginFormVisible();
    await loginPage.login(VALID_USERNAME, VALID_PASSWORD);
    await loginPage.expectSuccessfulLogin();
  });

  test('should display error when credentials are invalid', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.expectLoginFormVisible();
    await loginPage.login(INVALID_USERNAME, INVALID_PASSWORD);
    await loginPage.expectErrorMessage('Epic sadface: Username and password do not match any user in this service');
  });

  test('should require username and password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.expectLoginFormVisible();
    await loginPage.submit();
    await loginPage.expectErrorMessage('Epic sadface: Username is required');
  });
});
