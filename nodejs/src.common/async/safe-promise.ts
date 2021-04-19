export interface SafePromiseError {
  reason?: any | undefined;
  caught?: any | undefined;
}

export const getSafePromise = <T>(
  executor: (
    resolve: (value: T | PromiseLike<T>) => void,
    reject: (reason?: any) => void
  ) => void
): Promise<T> => {
  const promise = new Promise<T>((resolve, reject) => {
    try {
      executor(resolve, (reason) =>
        reject({ reason: reason } as SafePromiseError)
      );
    } catch (err) {
      reject({ caught: err } as SafePromiseError);
    }
  });

  return promise;
};

export const executeSafe = <T>(
  callback: () => T | PromiseLike<T>,
  reject: (reason?: any) => void,
  respond?: ((val: T | PromiseLike<T>) => void) | undefined | null
) => {
  respond = respond ?? reject;

  let val: T | PromiseLike<T> | undefined;
  let excpCaught = false;

  try {
    val = callback();
  } catch (err) {
    excpCaught = true;
    reject({ caught: err } as SafePromiseError);
  }

  if (!excpCaught) {
    respond(val as T | PromiseLike<T>);
  }

  return excpCaught;
};

export const executeWithVal = <TVal, TRetVal>(
  value: TVal,
  callback: ((val: TVal) => TRetVal | PromiseLike<TRetVal>) | undefined | null,
  respond: (val: TRetVal | PromiseLike<TRetVal>) => void
) => {
  let retVal: TRetVal | PromiseLike<TRetVal> | undefined;

  if (callback) {
    retVal = callback(value);
  }

  respond(retVal as TRetVal | PromiseLike<TRetVal>);
  return retVal;
};

export const executeSafeWithVal = <TVal, TRetVal>(
  value: TVal,
  callback: (val: TVal) => TRetVal | PromiseLike<TRetVal>,
  reject: (reason?: any) => void,
  respond?: ((val: TRetVal | PromiseLike<TRetVal>) => void) | undefined | null
) => {
  executeSafe(
    () => {
      const retVal = callback(value);
      return retVal;
    },
    reject,
    respond ?? reject
  );
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

  unsafeFinally(onfinally?: () => void | undefined | null) {
    const retSafeProm = new SafePromise<T>(this.promise.finally(onfinally));

    return retSafeProm;
  }

  safeFinally(onfinally?: (() => void) | undefined | null) {
    const retSafeProm = new SafePromise<T>(null, (resolve, reject) => {
      this.promise.finally(() => {
        if (onfinally) {
          executeSafe(onfinally, resolve, reject);
        }
      });
    });

    return retSafeProm;
  }

  unsafeThen<RsVal, RjVal>(
    onfulfilled?: ((value: T) => RsVal | PromiseLike<RsVal>) | undefined | null,
    onrejected?:
      | ((reason?: any) => RjVal | PromiseLike<RjVal>)
      | undefined
      | null
  ) {
    const retSafeProm = new SafePromise<RsVal | RjVal>(
      new Promise<RsVal | RjVal>((resolve, reject) => {
        this.promise.then(
          (value) => {
            const retVal = executeWithVal(value, onfulfilled, resolve);
            return retVal;
          },
          (reason) => {
            const retVal = executeWithVal(reason, onrejected, reject);
            return retVal;
          }
        );
      })
    );

    return retSafeProm;
  }

  safeThen<RsVal, RjVal>(
    onfulfilled?: ((value: T) => RsVal | PromiseLike<RsVal>) | undefined | null,
    onrejected?:
      | ((reason?: any) => RjVal | PromiseLike<RjVal>)
      | undefined
      | null
  ): SafePromise<RsVal | RjVal> {
    const retSafeProm = new SafePromise<RsVal | RjVal>(
      new Promise<RsVal | RjVal>((resolve, reject) => {
        this.promise.then(
          (value) => {
            let retVal: RsVal | PromiseLike<RsVal> | undefined;

            executeSafeWithVal(
              value,
              (val) => {
                if (onfulfilled) {
                  retVal = onfulfilled(val);
                }
              },
              resolve,
              reject
            );

            return retVal;
          },
          (reason) => {
            let retVal: RjVal | PromiseLike<RjVal> | undefined;

            executeSafeWithVal(
              reason,
              (rsn) => {
                if (onrejected) {
                  retVal = onrejected(rsn);
                }
              },
              resolve,
              reject
            );

            return retVal;
          }
        );
      })
    );

    return retSafeProm;
  }
}
