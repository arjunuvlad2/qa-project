import { test, expect } from '@playwright/test';

const VALID_USERNAME = 'standard_user';
const VALID_PASSWORD = 'secret_sauce';

test.describe('Sauce Demo login flow', () => {
  test('allows a user to log in with a valid username and password', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');

    const usernameInput = page.getByPlaceholder('Username');
    const passwordInput = page.getByPlaceholder('Password');
    const loginButton = page.getByRole('button', { name: /login/i });

    await expect(usernameInput).toBeVisible();
    await usernameInput.fill(VALID_USERNAME);

    await expect(passwordInput).toBeVisible();
    await passwordInput.fill(VALID_PASSWORD);

    await expect(loginButton).toBeEnabled();
    await loginButton.click();

    await expect(page).toHaveURL(/inventory\.html$/i, { timeout: 10000 });
    await expect(page.getByText('Products')).toBeVisible();
  });
});
