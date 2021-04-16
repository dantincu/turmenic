export interface AwaitResult<TResult, TError> {
  result: TResult | undefined;
  error: TError | undefined;
}

export interface AwaitOpts<TResult, TError> {
  rethrowErr?: boolean | undefined;
}

const getDefaultOpts = <TResult, TError>() => {
  const opts = {
    rethrowErr: true,
  } as AwaitOpts<TResult, TError>;

  return opts;
};

const normalizeOpts = <TResult, TError>(
  opts?: AwaitOpts<TResult, TError> | undefined
) => {
  opts = opts ?? getDefaultOpts();
  return opts;
};

export const awaitSafe = async <TResult, TError>(
  func: () => Promise<TResult>,
  opts?: AwaitOpts<TResult, TError> | undefined
): Promise<AwaitResult<TResult, TError>> => {
  opts = normalizeOpts(opts);

  const awaitResult = {} as AwaitResult<TResult, TError>;

  try {
    awaitResult.result = await func();
  } catch (err) {
    if (opts.rethrowErr) {
      throw err;
    }

    awaitResult.error = err;
  }

  return awaitResult;
};
