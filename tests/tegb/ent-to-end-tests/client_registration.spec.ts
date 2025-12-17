import { expect, test } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { UserLoginApi } from "../../../src/api/tegb/user_login_api.ts";
import { CreateBankAccountApi } from "../../../src/api/tegb/create_bank_account_api.ts";
import { LoginPage } from "../../../src/pages/tegb/login_page.ts";

test("Register new client and Login E2E", async ({ page, request }) => {
  const loginPage = new LoginPage(page);

  const username: string =
    faker.internet.username() + faker.number.int({ max: 1_000_000 });
  const password: string = faker.internet.password();
  const email: string = faker.internet.email();
  const firstName: string = faker.person.firstName();
  const lastName: string = faker.person.lastName();
  const phone: string = faker.phone.number({ style: "international" });
  const age: string = faker.number.int({ min: 18, max: 99 }).toString();

  await loginPage
    .open()
    .then((login) => login.clickRegisterButton())
    .then((register) =>
      register.fillRegistrationForm({
        username,
        password,
        email,
      })
    )
    .then((register) => register.clickRegisterButton())
    .then((login) => login.checkSucessRegistrationMessage());

  const userLoginApi = new UserLoginApi(request);
  const loginResponse = await userLoginApi.userLogin(username, password);
  const loginResponseBody = await loginResponse.json();
  const accessToken = loginResponseBody.access_token;
  expect(loginResponseBody, "Login Response has access_token").toHaveProperty(
    "access_token"
  );

  const startBalance: number = faker.number.int({ min: 0, max: 1_000_000 });
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

  await loginPage
    .open()
    .then((login) => login.fillLoginForm({ username, password }))
    .then((login) => login.clickLoginButton())
    .then((dashboard) => dashboard.clickEditProfileButton())
    .then((profile) =>
      profile.fillProfileDetailForm({
        firstName,
        lastName,
        email,
        phone,
        age,
      })
    )
    .then((profile) => profile.clickSaveButton())
    .then((dashboard) =>
      dashboard.verifyProfileData({ firstName, lastName, email, phone, age })
    )
    .then((dashboard) => dashboard.verifyNewBankAccount(startBalance))
    .then((dashboard) => dashboard.clickLogoutButton());
});
