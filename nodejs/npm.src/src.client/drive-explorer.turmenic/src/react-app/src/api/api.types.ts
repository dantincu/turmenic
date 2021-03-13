import { AxiosError, AxiosResponse } from "axios";

export interface ApiError {
  statusCode?: number;
  statusText?: string;
}

export interface ApiResponse<TData, TError> {
  response?: AxiosResponse<TData>;
  reqError?: AxiosError<TError>;
  apiError?: ApiError;
  error?: Error;
  result?: TData;
}
