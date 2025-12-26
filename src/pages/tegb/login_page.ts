import { expect, Locator, Page } from "@playwright/test";
import { RegistrationPage } from "./register_page.ts";
import { DashboardPage } from "./dashboard_page.ts";
import { LoginForm } from "../../types/tegb/form-fields/login_form.ts";
import { FE_BASE_URL } from "../../config/tegb/env.ts";

export class LoginPage {
  readonly page: Page;
  readonly url = FE_BASE_URL;

  readonly loginForm: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly registerButton: Locator;
  readonly loginButton: Locator;
  readonly successRegisterMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginForm = page.locator('[data-testid="login-form"]');
    this.usernameInput = page.locator('[data-testid="username-input"]');
    this.passwordInput = page.locator('[data-testid="password-input"]');
    this.registerButton = page.locator('[data-testid="register-button"]');
    this.loginButton = page.locator('[data-testid="submit-button"]');
    this.successRegisterMessage = page.locator(
      '[data-testid="success-message"]'
    );
  }

  async open() {
    await this.page.goto(this.url);
    return this;
  }

  async clickRegisterButton() {
    await this.registerButton.click();
    return new RegistrationPage(this.page);
  }

  async clickLoginButton() {
    await this.loginButton.click();
    return new DashboardPage(this.page);
  }

  async fillLoginForm(loginFields: LoginForm) {
    const { username, password } = loginFields;
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    return this;
  }

  async checkSuccessRegistrationMessage() {
    await expect(this.successRegisterMessage).toBeVisible();
    return this;
  }

  async login(username: string, password: string) {
    await this.open();
    await this.fillLoginForm({ username, password });
    return this.clickLoginButton();
  }
}
