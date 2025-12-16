import { APIRequestContext } from "@playwright/test";

export class UserLoginApi {
  readonly request: APIRequestContext;
  readonly apiBaseURL = "https://tegb-backend-877a0b063d29.herokuapp.com";

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async userLoginApi(username: string, password: string) {
    const response = await this.request.post(`${this.apiBaseURL}/tegb/login`, {
      data: {
        username,
        password,
      },
    });
    return response;
  }
}
