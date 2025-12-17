import { APIRequestContext } from "@playwright/test";
import { CreateBankAccountRequest } from "../../types/tegb/api/create_bank_account_request.ts";

export class CreateBankAccountApi {
  readonly request: APIRequestContext;
  readonly apiBaseURL = "https://tegb-backend-877a0b063d29.herokuapp.com";

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async createBankAccount(token: string, data: CreateBankAccountRequest) {
    const response = await this.request.post(
      `${this.apiBaseURL}/tegb/accounts/create`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
        data,
      }
    );
    return response;
  }
}
