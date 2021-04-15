import axios, { AxiosResponse } from "axios";

import { ApiResponse, ApiError } from "./api.types.js";

export abstract class ApiBase {
  baseUrl: string;

  constructor(baseUrl?: string) {
    this.baseUrl = (baseUrl ?? process.env.REACT_APP_API_URL) as string;
  }

  async executeRequestAsync<TData, TError extends ApiError>(
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

  processResponse<TData, TError extends ApiError>(
    response: ApiResponse<TData, TError>
  ) {
    if (this.isResponseSuccessfull(response.response)) {
      response.result = response.response?.data;
    } else {
      response.apiError = response.reqError?.response?.data ?? {
        statusCode: null,
        error: response.reqError?.code,
        message: response.reqError?.message,
      };
    }
  }
}
