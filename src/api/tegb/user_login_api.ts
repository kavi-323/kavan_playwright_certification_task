import { APIRequestContext } from "@playwright/test";
import { API_BASE_URL } from "../../config/tegb/env.ts";

export class UserLoginApi {
  readonly request: APIRequestContext;
  readonly apiBaseURL = API_BASE_URL;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async userLogin(username: string, password: string) {
    const response = await this.request.post(`${this.apiBaseURL}/tegb/login`, {
      data: {
        username,
        password,
      },
    });
    return response;
  }
}
