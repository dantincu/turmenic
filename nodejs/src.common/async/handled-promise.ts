export interface HandledPromiseError {
  reason?: any | undefined;
  caught?: any | undefined;
}

export const getHandledPromise = <T>(
  executor: (
    resolve: (value: T | PromiseLike<T>) => void,
    reject: (reason?: any) => void
  ) => void
): Promise<T> => {
  const promise = new Promise<T>((resolve, reject) => {
    try {
      executor(resolve, (reason) =>
        reject({ reason: reason } as HandledPromiseError)
      );
    } catch (err) {
      reject({ caught: err } as HandledPromiseError);
    }
  });

  return promise;
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

    this.promise = promise ?? getHandledPromise(executor);
  }

  finally(onfinally?: () => void | undefined | null) {
    this.promise.finally(onfinally);
  }

  then<RsVal, RjVal>(
    onfulfilled?: ((value: T) => RsVal | PromiseLike<RsVal>) | undefined | null,
    onrejected?:
      | ((reason: any) => RjVal | PromiseLike<RjVal>)
      | undefined
      | null
  ) {
    const retHandledProm = new SafePromise<RsVal | RjVal>(
      new Promise<RsVal | RjVal>((resolve, reject) => {
        this.promise.then(
          (value) => {
            let retVal: RsVal | PromiseLike<RsVal> | undefined;

            if (onfulfilled) {
              retVal = onfulfilled(value);
            }

            resolve(retVal);
            return retVal;
          },
          (reason) => {
            let retVal: RjVal | PromiseLike<RjVal> | undefined;

            if (onrejected) {
              retVal = onrejected(reason);
            }

            reject(retVal);
            return retVal;
          }
        );
      })
    );

    return retHandledProm;
  }

  thenHandled<RsVal, RjVal>(
    onfulfilled?: ((value: T) => RsVal | PromiseLike<RsVal>) | undefined | null,
    onrejected?:
      | ((reason: any) => RjVal | PromiseLike<RjVal>)
      | undefined
      | null
  ): SafePromise<RsVal | RjVal> {
    const retHandledProm = new SafePromise<RsVal | RjVal>(
      new Promise<RsVal | RjVal>((resolve, reject) => {
        this.promise.then(
          (value) => {
            let retVal: RsVal | PromiseLike<RsVal> | undefined;
            let excp = false;

            if (onfulfilled) {
              try {
                retVal = onfulfilled(value);
              } catch (err) {
                excp = true;
                reject({ caught: err } as HandledPromiseError);
              }
            }

            if (!excp) {
              resolve(retVal);
            }

            return retVal;
          },
          (reason) => {
            let retVal: RjVal | PromiseLike<RjVal> | undefined;
            let excp = false;

            if (onrejected) {
              try {
                retVal = onrejected(reason);
              } catch (err) {
                excp = true;
                reject({ caught: err, reason: reason } as HandledPromiseError);
              }
            }

            if (!excp) {
              reject({ reason: reason } as HandledPromiseError);
            }

            return retVal;
          }
        );
      })
    );

    return retHandledProm;
  }
}
