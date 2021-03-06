export interface Exception {
  name: string;
  message: string;
  stack: string;
}

export interface SafePromiseError {
  reason?: any | undefined;
  caught?: any | undefined;
  rsn?: any | undefined;
  exc?: any | undefined;
}

export const getExc = (exc: Error) => {
  const retObj: Exception = {
    name: exc.name,
    message: exc.message,
    stack: exc.stack ?? "",
  };

  return retObj;
};

export const getNormPromErr = (err: SafePromiseError) => {
  if (err.reason) {
    err.rsn = getExc(err.reason);
  }

  if (err.caught) {
    err.exc = getExc(err.caught);
  }

  return err;
};

export const getSafePromise = <T>(
  executor: (
    resolve: (value: T | PromiseLike<T>) => void,
    reject: (reason?: any) => void
  ) => void
): Promise<T> => {
  const promise = new Promise<T>((resolve, reject) => {
    try {
      executor(resolve, (reason) => reject(getNormPromErr({ reason: reason })));
    } catch (err) {
      reject(getNormPromErr({ caught: err }));
    }
  });

  return promise;
};

export const executeSafe = <T>(
  callback: () => T | PromiseLike<T>,
  reject?: ((reason?: any) => void) | null | undefined
) => {
  let val: T | PromiseLike<T> | undefined;

  if (reject) {
    try {
      val = callback();
    } catch (err) {
      reject({ caught: err } as SafePromiseError);
    }
  } else {
    val = callback();
  }

  return val;
};

export const executeSafeWithVal = <TVal, TRetVal>(
  value: TVal,
  callback: (val: TVal) => TRetVal | PromiseLike<TRetVal>,
  reject?: ((reason?: any) => void) | null | undefined
) => {
  const retVal = executeSafe(() => {
    const retVal = callback(value);

    return retVal;
  }, reject);

  return retVal;
};

export class SafePromise<T> {
  promise: Promise<T>;

  constructor(
    promise?: Promise<T> | undefined | null,
    executor?:
      | ((
          resolve: (value: T | PromiseLike<T>) => void,
          reject: (reason?: any) => void
        ) => void)
      | undefined
      | null
  ) {
    if (!(promise || executor)) {
      throw new Error("Either the promise or the executor must have a value");
    }

    this.promise =
      promise ??
      getSafePromise(
        executor as (
          resolve: (value: T | PromiseLike<T>) => void,
          reject: (reason?: any) => void
        ) => void
      );
  }

  safeThen<RsVal, RjVal>(
    opts: SafeThenOpts<T, RsVal, RjVal>
  ): SafePromise<RsVal | RjVal> {
    const retSafeProm = new SafePromise<RsVal | RjVal>(
      this.promise.then(
        (value) => {
          const retVal = executeSafeWithVal(
            value,
            opts.onfulfilled,
            opts.onfulfilledCrashed
          );

          return retVal;
        },
        (reason) => {
          const retVal = executeSafeWithVal(
            reason,
            opts.onrejected,
            opts.onrejectedCrashed
          );

          return retVal;
        }
      ) as Promise<RsVal | RjVal>
    );

    return retSafeProm;
  }
}

export interface SafeThenOpts<T, RsVal, RjVal> {
  onfulfilled: (value: T) => RsVal | PromiseLike<RsVal>;
  onrejected: (reason?: any) => RjVal | PromiseLike<RjVal>;
  onfulfilledCrashed?: ((reason?: any) => void) | undefined | null;
  onrejectedCrashed?: ((reason?: any) => void) | undefined | null;
}
