import { APIRequestContext } from "@playwright/test";
import { CreateBankAccountRequest } from "../../types/tegb/api/create_bank_account_request.ts";
import { API_BASE_URL } from "../../config/tegb/env.ts";

export class CreateBankAccountApi {
  readonly request: APIRequestContext;
  readonly apiBaseURL = API_BASE_URL;

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
