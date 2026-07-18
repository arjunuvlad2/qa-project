import { expect, Locator, Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameField: Locator;
  readonly passwordField: Locator;
  readonly loginButton: Locator;
  readonly errorBanner: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameField = page.getByPlaceholder('Username');
    this.passwordField = page.getByPlaceholder('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.errorBanner = page.getByText(/Epic sadface/i);
  }

  async goto() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async expectLoginFormVisible() {
    await expect(this.usernameField).toBeVisible();
    await expect(this.passwordField).toBeVisible();
    await expect(this.loginButton).toBeVisible();
  }

  async fillUsername(username: string) {
    await this.usernameField.fill(username);
  }

  async fillPassword(password: string) {
    await this.passwordField.fill(password);
  }

  async submit() {
    await this.loginButton.click();
  }

  async login(username: string, password: string) {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.submit();
  }

  async expectErrorMessage(text: string | RegExp) {
    await expect(this.errorBanner).toBeVisible();
    await expect(this.errorBanner).toHaveText(text);
  }

  async expectSuccessfulLogin() {
    await expect(this.page).toHaveURL(/inventory.html/);
    await expect(this.page.locator('.inventory_list')).toBeVisible();
  }
}