import { AxiosError, AxiosResponse } from "axios";

export interface ApiError {
  error: string | null | undefined;
  message: string | null | undefined;
  statusCode: number | null | undefined;
}

export interface ApiResponse<TData, TError> {
  response?: AxiosResponse<TData>;
  reqError?: AxiosError<TError extends ApiError ? ApiError : ApiError>;
  apiError?: ApiError;
  error?: Error;
  result?: TData;
}
