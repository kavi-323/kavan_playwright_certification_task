import { test, expect } from "@playwright/test";
import { LoginPage } from "../../../src/pages/tegb/login_page.ts";
import { DashboardPage } from "../../../src/pages/tegb/dashboard_page.ts";
import { TEST_USERS } from "../../../src/config/tegb/test_users.ts";

test.describe("Dashboard Visual Tests", () => {
  let dashboard: DashboardPage;
  const userLogin = TEST_USERS.user.username;
  const userPassword = TEST_USERS.user.password;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    dashboard = await loginPage.login(userLogin, userPassword);
  });

  test("Profile Detail Visual Test", async () => {
    await expect(dashboard.profileDetailSection).toHaveScreenshot(
      "profile_detail_section.png"
    );
  });
});
