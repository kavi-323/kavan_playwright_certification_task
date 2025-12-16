import { expect, Locator, Page } from "@playwright/test";
import { RegistrationPage } from "./register_page.ts";
import { DashboardPage } from "./dashboard_page.ts";
import { LoginForm } from "../../types/tegb/form-fields/login_form.ts";

export class LoginPage {
  readonly page: Page;
  readonly url = "https://tegb-frontend-88542200c6db.herokuapp.com/";

  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly registerButton: Locator;
  readonly loginButton: Locator;
  readonly succesRegisterMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('[data-testid="username-input"]');
    this.passwordInput = page.locator('[data-testid="password-input"]');
    this.registerButton = page.locator('[data-testid="register-button"]');
    this.loginButton = page.locator('[data-testid="submit-button"]');
    this.succesRegisterMessage = page.locator(
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
    await this.usernameInput.fill(loginFields.username);
    await this.passwordInput.fill(loginFields.password);
    return this;
  }

  async checkSucessRegistrationMessage() {
    await expect(this.succesRegisterMessage).toBeVisible();
    return this;
  }
}
