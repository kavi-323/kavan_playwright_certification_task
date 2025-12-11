import { Locator, Page, test } from "@playwright/test";
import { LoginPage } from "./login_page.ts";

export class RegistrationPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly emailInput: Locator;
  readonly registerButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('[data-testid="username-input"]');
    this.passwordInput = page.locator('[data-testid="password-input"]');
    this.emailInput = page.locator('[data-testid="email-input"]');
    this.registerButton = page.locator('[data-testid="submit-button"]');
  }
}
