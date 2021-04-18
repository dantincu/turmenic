export interface DisposableError<TOpenErr, TExecErr, TCloseErr> {
  openErr?: TOpenErr | undefined;
  execErr?: TExecErr | undefined;
  closeErr?: TCloseErr | undefined;
}

export const executeWithDisposable = <
  TDisposable,
  TOpenErr,
  TExecErr,
  TCloseErr
>(
  openFunc: (openCallback: (openErr?: TOpenErr) => void) => TDisposable,
  execFunc: (disposable: TDisposable) => Promise<void>,
  closeFunc: (
    disposable: TDisposable,
    closeCallback: (closeErr?: TCloseErr) => void
  ) => void
): Promise<void> => {
  const promise = new Promise<void>((resolve, reject) => {
    const disposable = openFunc((openErr) => {
      if (openErr) {
        reject({
          openErr: openErr,
        } as DisposableError<TOpenErr, TExecErr, TCloseErr>);
      } else {
        let executionError: TExecErr | undefined = undefined;

        execFunc(disposable)
          .then(
            () => {},
            (execErr) => {
              executionError = execErr;
            }
          )
          .finally(() => {
            closeFunc(disposable, (closeErr) => {
              if (closeErr) {
                reject({
                  execErr: executionError,
                  closeErr: closeErr,
                } as DisposableError<TOpenErr, TExecErr, TCloseErr>);
              } else if (typeof executionError !== "undefined") {
                reject({
                  execErr: executionError,
                } as DisposableError<TOpenErr, TExecErr, TCloseErr>);
              } else {
                resolve();
              }
            });
          });
      }
    });
  });

  return promise;
};
