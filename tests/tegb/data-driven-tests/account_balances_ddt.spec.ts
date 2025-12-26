import { faker } from "@faker-js/faker";
import { test, expect } from "@playwright/test";
import accountBalancesData from "../../../assets/tegb/ddt/account_balances_data.json";
import { RegistrationForm } from "../../../src/types/tegb/form-fields/register_form.ts";
import { UserLoginApi } from "../../../src/api/tegb/user_login_api.ts";
import { LoginPage } from "../../../src/pages/tegb/login_page.ts";
import { CreateBankAccountApi } from "../../../src/api/tegb/create_bank_account_api.ts";

test.describe("Data driven tests (DDT)", () => {
  accountBalancesData.balances.forEach((accountBalance, index) => {
    test(`${index + 1} DDT: Account balance ${accountBalance} Kč`, async ({
      page,
      request,
    }) => {
      const loginPage = new LoginPage(page);
      const registerData: RegistrationForm = {
        username:
          faker.internet.username() + faker.number.int({ max: 1_000_000 }),
        password: faker.internet.password(),
        email: faker.internet.email(),
      };
      const loginForm = {
        username: registerData.username,
        password: registerData.password,
      };

      await loginPage
        .open()
        .then((login) => login.clickRegisterButton())
        .then((register) => register.fillRegistrationForm(registerData))
        .then((register) => register.clickRegisterButton())
        .then((login) => login.checkSuccessRegistrationMessage());

      const userLoginApi = new UserLoginApi(request);
      const loginResponse = await userLoginApi.userLogin(
        registerData.username,
        registerData.password
      );
      const loginResponseBody = await loginResponse.json();
      const accessToken = loginResponseBody.access_token;
      expect(
        loginResponseBody,
        "Login Response has access_token"
      ).toHaveProperty("access_token");

      const startBalance: number = accountBalance;
      const type: string = faker.finance.accountName();
      const createBankAccountApi = new CreateBankAccountApi(request);
      const newBankAccountResponse =
        await createBankAccountApi.createBankAccount(accessToken, {
          startBalance,
          type,
        });
      expect(
        newBankAccountResponse.status(),
        "Created Bank Account has 201 Status"
      ).toBe(201);
      const newBankAccountResponseBody = await newBankAccountResponse.json();
      expect(
        newBankAccountResponseBody,
        `New Bank Account has balance: ${accountBalance} Kč`
      ).toMatchObject({ balance: startBalance });

      await loginPage
        .open()
        .then((login) => login.fillLoginForm(loginForm))
        .then((login) => login.clickLoginButton())
        .then((dashboard) => dashboard.verifyAccountBalance(accountBalance));
    });
  });
});
