import { expect, Locator, Page } from "@playwright/test";
import { ProfileDetailPage } from "./profile_detail_page.ts";
import { LoginPage } from "./login_page.ts";
import { ProfileDetailForm } from "../../types/tegb/form-fields/profile_detail_form.ts";
//import { CreateBankAccountApi } from "../../api/tegb/create_bank_account_api.ts";
import { CreateBankAccountRequest } from "../../types/tegb/api/create_bank_account_request.ts";

export class DashboardPage {
  readonly page: Page;
  readonly editProfileButton: Locator;
  readonly logoutButton: Locator;

  readonly firstNameValue: Locator;
  readonly lastNameValue: Locator;
  readonly emailValue: Locator;
  readonly phoneValue: Locator;
  readonly ageValue: Locator;
  readonly newAccountRow: Locator;

  readonly accountBalanceValue: Locator;

  constructor(page: Page) {
    this.page = page;
    this.editProfileButton = page.locator(
      '[data-testid="toggle-edit-profile-button"]'
    );

    this.logoutButton = page.locator('[data-testid="logout-button"]');

    this.firstNameValue = page.locator('[data-testid="name"]');
    this.lastNameValue = page.locator('[data-testid="surname"]');
    this.emailValue = page.locator('[data-testid="email"]');
    this.phoneValue = page.locator('[data-testid="phone"]');
    this.ageValue = page.locator('[data-testid="age"]');

    this.accountBalanceValue = page.locator('[data-testid="account-balance"]');
    this.newAccountRow = page.locator('[data-testid^="account-row"]');
  }

  async clickEditProfileButton() {
    await expect(this.editProfileButton).toBeVisible({ timeout: 10000 });
    await this.editProfileButton.click();
    return new ProfileDetailPage(this.page);
  }

  async clickLogoutButton() {
    await this.logoutButton.click();
    return new LoginPage(this.page);
  }

  async verifyProfileData(expected: ProfileDetailForm) {
    await expect(this.firstNameValue).toContainText(expected.firstName);
    await expect(this.lastNameValue).toContainText(expected.lastName);
    await expect(this.emailValue).toContainText(expected.email);
    await expect(this.phoneValue).toContainText(expected.phone);
    await expect(this.ageValue).toContainText(expected.age);
    return this;
  }

  async newBankAccountVerification(expected: CreateBankAccountRequest) {
    const expectedBalance = `${expected.startBalance.toFixed(2)} Kč`;
    await expect(this.accountBalanceValue).toHaveText(expectedBalance);
    await expect(this.newAccountRow).toBeVisible();
    return this;
  }
}
