import axios, { AxiosResponse } from "axios";

import { ApiResponse } from "./api.types";
import { FileSystemRootFolder } from "../src.node.common/app-data/fileSystem.types";
import { DeviceRootDirLocation } from "../src.node.common/app-data/schema/device-dir-locations.schema";

export class DriveApi {
  baseUrl: string;

  constructor(baseUrl?: string) {
    this.baseUrl = (baseUrl ?? process.env.REACT_APP_API_URL) as string;
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

  public async getDeviceRootFolders() {
    const response = await this.executeRequestAsync<
      FileSystemRootFolder[],
      Error
    >(async () => {
      const url = this.getUrl("device-root-folders");
      const result: AxiosResponse<FileSystemRootFolder[]> = await axios(url);

      return result;
    });

    return response;
  }

  public async getDeviceAppDrives() {
    const response = await this.executeRequestAsync<
      DeviceRootDirLocation[],
      any
    >(async () => {
      const url = this.getUrl("device-app-drives");
      const result = await axios(url);

      return result;
    });

    return response;
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

  async executeRequestAsync<TData, TError>(
    func: () => Promise<AxiosResponse<TData>>
  ): Promise<ApiResponse<TData, TError>> {
    const response: ApiResponse<TData, TError> = {};

    try {
      response.response = await func();
    } catch (err) {
      response.reqError = err;
    }

    this.processResponse(response);
    return response;
  }

  async executeResultAsync<TData>(
    func: () => Promise<TData>
  ): Promise<ApiResponse<TData, any>> {
    const response: ApiResponse<TData, any> = {};

    try {
      response.result = await func();
    } catch (err) {
      response.error = err;
    }

    return response;
  }

  getUrl(relUrl: string): string {
    const url = this.baseUrl + "/" + relUrl;
    return url;
  }

  isResponseSuccessfull(response?: AxiosResponse) {
    const success = (response?.status ?? 400) < 400;
    return success;
  }

  isUnauthorized(response?: AxiosResponse) {
    const unauthorized = (response?.status ?? 400) === 401;
    return unauthorized;
  }

  processResponse<TData, TError>(response: ApiResponse<TData, TError>) {
    if (this.isResponseSuccessfull(response.response)) {
      response.result = response.response?.data;
    } else {
      response.apiError = {
        statusCode: response.response?.status,
        statusText: response.response?.statusText,
      };
    }
  }
}

export const driveApi = new DriveApi();
