import { Locator, Page, test, expect } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly url = "https://tegb-frontend-88542200c6db.herokuapp.com/";

  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly registerButton: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('[data-testid="username-input"]');
    this.passwordInput = page.locator('[data-testid="password-input"]');
    this.registerButton = page.locator('[data-testid="register-button"]');
    this.loginButton = page.locator('[data-testid="submit-button"]');
  }
}
