import { test, expect } from "@playwright/test";
import { DashboardPage } from "../../../src/pages/tegb/dashboard_page.ts";
import { LoginPage } from "../../../src/pages/tegb/login_page.ts";
import { TEST_USERS } from "../../../src/config/tegb/test_users.ts";

test.describe("Atomic Tests: Dashboard", () => {
  let dashboard: DashboardPage;
  const userLogin = TEST_USERS.user.username;
  const userPassword = TEST_USERS.user.password;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    dashboard = await loginPage.login(userLogin, userPassword);
  });

  test("Header Section & Logout", async () => {
    await test.step("Logo", async () => {
      await expect.soft(dashboard.logo).toBeVisible();
    });

    await test.step("App Title", async () => {
      await expect.soft(dashboard.appTitle).toBeVisible();
      await expect.soft(dashboard.appTitle).toHaveText("TEG#B Dashboard");
    });

    await test.step("Logout Button", async () => {
      await expect.soft(dashboard.logoutButton).toBeVisible();
      const loginPage = await dashboard.clickLogoutButton();
      await expect.soft(loginPage.loginForm).toBeVisible();
    });
  });

  test("Sidebar Navigation", async () => {
    await test.step("Sidebar Container", async () => {
      await expect.soft(dashboard.sidebar).toBeVisible();
    });

    await test.step("Home Button", async () => {
      await expect.soft(dashboard.homeButton).toBeVisible();
    });
    await test.step("Home Button Text", async () => {
      await expect.soft(dashboard.homeButton).toHaveText("Domů");
    });

    await test.step("Accounts Button", async () => {
      await expect.soft(dashboard.accountsButton).toBeVisible();
    });
    await test.step("Accounts Button Text", async () => {
      await expect.soft(dashboard.accountsButton).toHaveText("Účty");
    });

    await test.step("Transactions Button", async () => {
      await expect.soft(dashboard.transactionsButton).toBeVisible();
    });
    await test.step("Transactions Button Text", async () => {
      await expect.soft(dashboard.transactionsButton).toHaveText("Transakce");
    });

    await test.step("Support Button", async () => {
      await expect.soft(dashboard.supportButton).toBeVisible();
    });
    await test.step("Support Button Text", async () => {
      await expect.soft(dashboard.supportButton).toHaveText("Podpora");
    });
  });

  test("Dashboard Section", async () => {
    await expect.soft(dashboard.dashboardMainSection).toBeVisible();
  });

  test("Profile Section", async () => {
    await test.step("Profile Title & Edit Button", async () => {
      await expect.soft(dashboard.profileTitle).toBeVisible();
      await expect.soft(dashboard.profileTitle).toHaveText("Detaily Profilu");
      await expect.soft(dashboard.editProfileButton).toBeVisible();
      const editUserProfileBox = await dashboard.clickEditProfileButton();
      await expect.soft(editUserProfileBox.saveButton).toBeVisible();
      await editUserProfileBox.cancelButton.click();
      await expect.soft(dashboard.profileDetailSection).toBeVisible();
    });

    await test.step("Profile Values", async () => {
      await expect.soft(dashboard.firstNameValue).toBeVisible();
      await expect.soft(dashboard.lastNameValue).toBeVisible();
      await expect.soft(dashboard.emailValue).toBeVisible();
      await expect.soft(dashboard.phoneValue).toBeVisible();
      await expect.soft(dashboard.ageValue).toBeVisible();
    });
  });

  test("Accounts Section", async () => {
    await test.step("Accounts Header", async () => {
      await expect.soft(dashboard.accountsTitle).toBeVisible();
      await expect.soft(dashboard.accountsTitle).toHaveText("Účty");
      await expect.soft(dashboard.addNewAccountButton).toBeVisible();
    });

    await test.step("Accounts Table Headers", async () => {
      await expect.soft(dashboard.accountNumberHeader).toBeVisible();
      await expect.soft(dashboard.accountNumberHeader).toHaveText("Číslo účtu");

      await expect.soft(dashboard.accountBalanceHeader).toBeVisible();
      await expect.soft(dashboard.accountBalanceHeader).toHaveText("Zůstatek");

      await expect.soft(dashboard.accountTypeHeader).toBeVisible();
      await expect.soft(dashboard.accountTypeHeader).toHaveText("Typ účtu");
    });

    await test.step("Account Row Visibility", async () => {
      await expect.soft(dashboard.accountRows.first()).toBeVisible();
    });
    await test.step("Account Values", async () => {
      await expect.soft(dashboard.accountNumberValue).toBeVisible();
      await expect.soft(dashboard.accountBalanceValue).toBeVisible();
      await expect.soft(dashboard.accountTypeValue).toBeVisible();
    });
  });
});
