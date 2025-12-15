import { APIRequestContext } from "@playwright/test";

export class CreateBankAccountApi {
  readonly request: APIRequestContext;
  readonly apiBaseURL = "https://tegb-backend-877a0b063d29.herokuapp.com";

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async createBankAccountApi(
    token: string,
    startBalance: number,
    type: string
  ) {
    const response = await this.request.post(
      `${this.apiBaseURL}/tegb/accounts/create`,
      {
        headers: {
          authorization: "bearer" + " " + token,
        },
        data: {
          startBalance,
          type,
        },
      }
    );
    return response;
  }
}
