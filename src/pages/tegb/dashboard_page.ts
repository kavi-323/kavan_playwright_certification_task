import { expect, Locator, Page } from "@playwright/test";
import { ProfileDetailPage } from "./profile_detail_page.ts";

export class DashboardPage {
  readonly page: Page;
  readonly editProfileButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.editProfileButton = page.locator(
      '[data-testid="toggle-edit-profile-button"]'
    );
  }

  async clickEditProfileButton() {
    await expect(this.editProfileButton).toBeVisible({ timeout: 10000 });
    await this.editProfileButton.click();
    return new ProfileDetailPage(this.page);
  }
}
