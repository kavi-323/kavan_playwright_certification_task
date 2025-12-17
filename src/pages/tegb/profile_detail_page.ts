import { Locator, Page } from "@playwright/test";
import { ProfileDetailForm } from "../../types/tegb/form-fields/profile_detail_form.ts";
import { DashboardPage } from "./dashboard_page.ts";

export class ProfileDetailPage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly phoneInput: Locator;
  readonly ageInput: Locator;
  readonly saveButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.locator('[data-testid="chage-name-input"]');
    this.lastNameInput = page.locator('[data-testid="chage-surname-input"]');
    this.emailInput = page.locator('[data-testid="chage-email-input"]');
    this.phoneInput = page.locator('[data-testid="chage-phone-input"]');
    this.ageInput = page.locator('[data-testid="chage-age-input"]');
    this.saveButton = page.locator('[data-testid="save-changes-button"]');
  }

  async fillProfileDetailForm(profileFields: ProfileDetailForm) {
    const { firstName, lastName, email, phone, age } = profileFields;
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.emailInput.fill(email);
    await this.phoneInput.fill(phone);
    await this.ageInput.fill(age);
    return this;
  }

  async clickSaveButton() {
    await this.saveButton.click();
    return new DashboardPage(this.page);
  }
}
