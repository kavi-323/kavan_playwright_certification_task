import { expect, Locator, Page } from "@playwright/test";
import { ProfileDetailPage } from "./profile_detail_page.ts";
import { LoginPage } from "./login_page.ts";
import { ProfileDetailForm } from "../../types/tegb/form-fields/profile_detail_form.ts";

export class DashboardPage {
  readonly page: Page;

  readonly logo: Locator;
  readonly appTitle: Locator;
  readonly logoutButton: Locator;

  readonly sidebar: Locator;
  readonly homeButton: Locator;
  readonly accountsButton: Locator;
  readonly transactionsButton: Locator;
  readonly supportButton: Locator;

  readonly profileTitle: Locator;
  readonly editProfileButton: Locator;
  readonly firstNameValue: Locator;
  readonly lastNameValue: Locator;
  readonly emailValue: Locator;
  readonly phoneValue: Locator;
  readonly ageValue: Locator;

  readonly accountsTitle: Locator;
  readonly addNewAccountButton: Locator;
  readonly accountNumberHeader: Locator;
  readonly accountBalanceHeader: Locator;
  readonly accountTypeHeader: Locator;
  readonly accountBalanceValue: Locator;
  readonly accountNumberValue: Locator;
  readonly accountTypeValue: Locator;
  readonly accountRows: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logo = page.locator('[data-testid="logo-img"]');
    this.appTitle = page.locator('[data-testid="app-title"]');
    this.logoutButton = page.locator('[data-testid="logout-button"]');

    this.sidebar = page.locator("aside.dashboard-sidebar");
    this.homeButton = page.locator(
      '//aside[contains(@class,"dashboard-sidebar")]//nav//li[1]'
    );
    this.accountsButton = page.locator(
      '//aside[contains(@class,"dashboard-sidebar")]//nav//li[2]'
    );
    this.transactionsButton = page.locator(
      '//aside[contains(@class,"dashboard-sidebar")]//nav//li[3]'
    );
    this.supportButton = page.locator(
      '//aside[contains(@class,"dashboard-sidebar")]//nav//li[4]'
    );

    this.profileTitle = page.locator('[data-testid="profile-details-title"]');
    this.editProfileButton = page.locator(
      '[data-testid="toggle-edit-profile-button"]'
    );
    this.firstNameValue = page.locator('[data-testid="name"]');
    this.lastNameValue = page.locator('[data-testid="surname"]');
    this.emailValue = page.locator('[data-testid="email"]');
    this.phoneValue = page.locator('[data-testid="phone"]');
    this.ageValue = page.locator('[data-testid="age"]');

    this.accountsTitle = page.locator('[data-testid="accounts-title"]');
    this.addNewAccountButton = page.locator(
      '[data-testid="add-account-button"]'
    );
    this.accountNumberHeader = page.locator(
      '[data-testid="account-number-heading"]'
    );
    this.accountBalanceHeader = page.locator(
      '[data-testid="account-balance-heading"]'
    );
    this.accountTypeHeader = page.locator(
      '[data-testid="account-type-heading"]'
    );
    this.accountNumberValue = page.locator('[data-testid="account-number"]');
    this.accountBalanceValue = page.locator('[data-testid="account-balance"]');
    this.accountTypeValue = page.locator('[data-testid="account-type"]');
    this.accountRows = page.locator('[data-testid^="account-row"]');
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
    const { firstName, lastName, email, phone, age } = expected;
    await expect(this.firstNameValue).toContainText(firstName);
    await expect(this.lastNameValue).toContainText(lastName);
    await expect(this.emailValue).toContainText(email);
    await expect(this.phoneValue).toContainText(phone);
    await expect(this.ageValue).toContainText(age);
    return this;
  }

  async verifyNewBankAccount(expectedBalance: number) {
    const expectedBalanceFormatted = `${expectedBalance.toFixed(2)} Kč`;
    await expect(this.accountBalanceValue).toHaveText(expectedBalanceFormatted);
    await expect(this.accountRows).toBeVisible();
    return this;
  }
}
