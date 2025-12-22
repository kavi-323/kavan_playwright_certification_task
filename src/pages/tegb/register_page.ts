import { Locator, Page, expect } from "@playwright/test";
import { LoginPage } from "./login_page.ts";
import { RegistrationForm } from "../../types/tegb/form-fields/register_form.ts";

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

  async fillRegistrationForm(registrationFields: RegistrationForm) {
    const { username, password, email } = registrationFields;
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.emailInput.fill(email);
    return this;
  }

  async clickRegisterButton() {
    await this.registerButton.click();
    return new LoginPage(this.page);
    await expect(
      this.page.locator('[data-testid="success-message"]')
    ).toBeVisible();
  }
}
