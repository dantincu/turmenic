import axios, { AxiosResponse } from "axios";

import { ApiBase } from "../src.node.common.client/axios/api.base";
import { ApiResponse } from "../src.node.common.client/axios/api.types";

export class AuthApi extends ApiBase {
  constructor(baseUrl?: string) {
    super(baseUrl);
  }

  public async ping() {
    const response = await this.executeRequestAsync(async () => {
      const result = await this.executePingRequest();
      return result;
    });

    return response;
  }

  public async assureAuth(): Promise<boolean> {
    const response = await this.executeResultAsync(async () => {
      let success = false;

      try {
        await this.executePingRequest();
        success = true;
      } catch (err) {
        success = false;
      }

      if (success !== true) {
        try {
          const response = await this.executeAuthRequest();
          success = response.data.authenticated === true;
        } catch (err) {
          success = false;
        }
      }

      if (success === true) {
        try {
          await this.executePingRequest();
        } catch (err) {
          success = false;
        }
      }

      return success;
    });

    return response.result ?? false;
  }

  async executePingRequest() {
    const url = this.getUrl("");
    const result = await axios(url);

    return result;
  }

  async executeAuthRequest() {
    const url = this.getUrl("auth");
    const result = await axios(url, {
      method: "POST",
    });

    return result;
  }
}

export const authApi = new AuthApi();
