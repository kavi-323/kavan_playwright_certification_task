import { test, expect } from "@playwright/test";
import { UserLoginApi } from "../../../src/api/tegb/user_login_api.ts";
import { TEST_USERS } from "../../../src/config/tegb/test_users.ts";

const userLogin = TEST_USERS.user.username;
const userPassword = TEST_USERS.user.password;

test.describe("User Login Test", () => {
  test("Response Assert", async ({ request }) => {
    const userLoginApi = new UserLoginApi(request);
    const loginResponse = await userLoginApi.userLogin(userLogin, userPassword);
    const loginResponseBody = await loginResponse.json();
    const accessToken = loginResponseBody.access_token;
    expect(loginResponse.status(), "Login Response has 201 status").toBe(201);
    expect(accessToken, "Login Response has access_token").toBeDefined();
    expect(typeof accessToken).toBe("string");
  });
});
