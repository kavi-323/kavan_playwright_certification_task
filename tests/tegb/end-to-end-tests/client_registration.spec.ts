import { expect, test } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { UserLoginApi } from "../../../src/api/tegb/user_login_api.ts";
import { CreateBankAccountApi } from "../../../src/api/tegb/create_bank_account_api.ts";
import { LoginPage } from "../../../src/pages/tegb/login_page.ts";
import { UserProfileForm } from "../../../src/types/tegb/form-fields/user_profile_detail_form.ts";
import { RegistrationForm } from "../../../src/types/tegb/form-fields/register_form.ts";

test("Register new client and Login E2E", async ({ page, request }) => {
  const loginPage = new LoginPage(page);

  const registerData: RegistrationForm = {
    username: faker.internet.username() + faker.number.int({ max: 1_000_000 }),
    password: faker.internet.password(),
    email: faker.internet.email(),
  };
  const loginForm = {
    username: registerData.username,
    password: registerData.password,
  };
  const userProfile: UserProfileForm = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: registerData.email,
    phone: faker.phone.number(),
    age: faker.number.int({ min: 18, max: 90 }).toString(),
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
  expect(loginResponseBody, "Login Response has access_token").toHaveProperty(
    "access_token"
  );

  const startBalance: number = faker.number.int({ min: 0, max: 1_000_000 });
  const type: string = faker.finance.accountName();
  const createBankAccountApi = new CreateBankAccountApi(request);
  const newBankAccountResponse = await createBankAccountApi.createBankAccount(
    accessToken,
    {
      startBalance,
      type,
    }
  );
  expect(
    newBankAccountResponse.status(),
    "Created Bank Account has 201 Status"
  ).toBe(201);

  await loginPage
    .open()
    .then((login) => login.fillLoginForm(loginForm))
    .then((login) => login.clickLoginButton())
    .then((dashboard) => dashboard.clickEditProfileButton())
    .then((profile) => profile.fillProfileDetailForm(userProfile))
    .then((profile) => profile.clickSaveButton())
    .then((dashboard) => dashboard.verifyProfileData(userProfile))
    .then((dashboard) => dashboard.verifyNewBankAccount(startBalance))
    .then((dashboard) => dashboard.clickLogoutButton());
});
