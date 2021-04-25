import { SafePromise, SafePromiseError } from "./safe-promise.js";

export interface DisposableSafePromiseError {
  openErr?: SafePromiseError | undefined;
  execErr?: SafePromiseError | undefined;
  closeErr?: SafePromiseError | undefined;
}

export const execSafeCallback = (
  func: (callback: (err?: any) => void) => void
): SafePromise<void> => {
  const retPromise = new SafePromise<void>(null, (resolve, reject) => {
    func((err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });

  return retPromise;
};

export const execSafeCallbackWithRetVal = <TRetVal>(
  func: (callback: (err?: any) => void) => TRetVal
): SafePromise<TRetVal> => {
  const retPromise = new SafePromise<TRetVal>(null, (resolve, reject) => {
    const retVal = func((err) => {
      if (err) {
        reject(err);
      } else {
        resolve(retVal);
      }
    });
  });

  return retPromise;
};

export const execSafeCallbackWithVal = <TVal>(
  val: TVal,
  func: (val: TVal, callback: (err?: any) => void) => void
) => {
  const retPromise = new SafePromise<void>(null, (resolve, reject) => {
    func(val, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });

  return retPromise;
};

/*

export const execWithDisp = <TDisposable, TOpenErr, TExecErr, TCloseErr>(
  openFunc: (openCallback: (openErr?: TOpenErr) => void) => TDisposable,
  execFunc: (disposable: TDisposable) => Promise<void>,
  closeFunc: (
    disposable: TDisposable,
    closeCallback: (closeErr?: TCloseErr) => void
  ) => void
): SafePromise<void> => {
  const getCloseDispProm = (disposable: TDisposable) => {
    const retProm = execSafeCallbackWithVal<TDisposable>(
      disposable,
      (disposable, callback) => closeFunc(disposable, callback)
    );

    return retProm;
  };

  const getCloseDispResponse = (
    disposable: TDisposable,
    dispErr: DisposableSafePromiseError,
    reject: (reason?: any) => void,
    response?: () => void
  ) => {
    const retProm = getCloseDispProm(disposable).safeThen(
      response ?? (() => reject(dispErr)),
      (reason) => {
        dispErr.closeErr = reason;
        reject(dispErr);
      }
    );

    return retProm;
  };

  const promise = new SafePromise<void>(null, (resolve, reject) => {
    let disposable: TDisposable;
    const dispErr = {} as DisposableSafePromiseError;

    const disposableProm = execSafeCallbackWithRetVal<TDisposable>(
      (callback) => {
        disposable = openFunc(callback);
        return disposable;
      }
    ).safeThen(
      (disposable) => {
        execSafeCallbackWithVal<TDisposable>(
          disposable,
          (disposable, callback) => {
            const execSafeProm = new SafePromise<void>(execFunc(disposable));

            execSafeProm.safeThen(
              () => {
                callback();
                resolve();
              },
              (reason) => {
                dispErr.execErr = reason;

                const retProm = getCloseDispResponse(
                  disposable,
                  dispErr,
                  (reason?: any) => {
                    callback(reason);
                    reject(dispErr);
                  }
                );

                return retProm;
              }
            );
          }
        );
      },
      (reason) => {
        dispErr.openErr = reason;

        const retProm = getCloseDispResponse(disposable, dispErr, reject);
        return retProm;
      }
    );
  });

  return promise;
};

*/
