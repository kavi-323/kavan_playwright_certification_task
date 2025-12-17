import { test, expect } from "@playwright/test";
import { LoginPage } from "../../../src/pages/tegb/login_page.ts";
import { DashboardPage } from "../../../src/pages/tegb/dashboard_page.ts";

test.describe("Dashboard Visual Tests", () => {
  let dashboard: DashboardPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    dashboard = await loginPage.login("client.1", "client1");
  });

  test("Profile Detail Visual Test", async () => {
    await expect(dashboard.profileDetailSection).toHaveScreenshot(
      "profile_detail_section.png"
    );
  });
});
