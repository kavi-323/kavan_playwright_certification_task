import { test, expect } from "@playwright/test";
import { LoginPage } from "../../../src/pages/tegb/login_page.ts";
import { DashboardPage } from "../../../src/pages/tegb/dashboard_page.ts";

// ! Add .env for login credentials

test.describe("Dashboard Visual Tests", () => {
  let dashboard: DashboardPage;
  const userLogin = "client.1";
  const userPassword = "client1";

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
