import { test, expect } from "@playwright/test";
import { UserLoginApi } from "../../../src/api/tegb/user_login_api.ts";

test.describe("User Login Tests", () => {
  test("Response Assert", async ({ request }) => {
    const userLoginApi = new UserLoginApi(request);
    const loginResponse = await userLoginApi.userLogin("client.1", "client1");
    const loginResponseBody = await loginResponse.json();
    const accessToken = loginResponseBody.access_token;
    expect(loginResponse.status(), "Login Response has 201 status").toBe(201);
    expect(accessToken, "Login Response has access_token").toBeDefined();
    expect(typeof accessToken).toBe("string");
  });
});
