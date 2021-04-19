export interface DisposableError<TOpenErr, TExecErr, TCloseErr> {
  openErr?: TOpenErr | undefined;
  execErr?: TExecErr | undefined;
  closeErr?: TCloseErr | undefined;
}

export interface SafeDisposableError<TOpenErr, TExecErr, TCloseErr>
  extends DisposableError<TOpenErr, TExecErr, TCloseErr> {
  unhandledOpenErr?: any | undefined;
  unhandledExecErr?: any | undefined;
  unhandledCloseErr?: any | undefined;
}

export interface ExecWithPromArgsOpts<
  TDisposable,
  TOpenErr,
  TExecErr,
  TCloseErr
> {
  resolve: (value: void | PromiseLike<void>) => void;
  reject: (reason?: any) => void;
  openFunc: (
    reject: (reason?: any) => void,
    openCallback: (reject: (reason?: any) => void, openErr?: TOpenErr) => void
  ) => TDisposable;
  execFunc: (
    reject: (reason?: any) => void,
    disposable: TDisposable
  ) => Promise<void>;
  closeFunc: (
    resolve: (value: void | PromiseLike<void>) => void,
    reject: (reason?: any) => void,
    disposable: TDisposable,
    closeCallback: (
      resolve: (value: void | PromiseLike<void>) => void,
      reject: (reason?: any) => void,
      closeErr?: TCloseErr
    ) => void
  ) => void;
}

const execWithPromArgs = <TDisposable, TOpenErr, TExecErr, TCloseErr>(
  opts: ExecWithPromArgsOpts<TDisposable, TOpenErr, TExecErr, TCloseErr>
): void => {
  const disposable = opts.openFunc(opts.reject, (reject, openErr) => {
    if (openErr) {
      reject({
        openErr: openErr,
      } as DisposableError<TOpenErr, TExecErr, TCloseErr>);
    } else {
      let executionError: TExecErr | undefined = undefined;

      opts
        .execFunc(opts.reject, disposable)
        .then(
          () => {},
          (execErr) => {
            executionError = execErr;
          }
        )
        .finally(() => {
          opts.closeFunc(
            opts.resolve,
            opts.reject,
            disposable,
            (resolve, reject, closeErr) => {
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
            }
          );
        });
    }
  });
};

export const execWithDisp = <TDisposable, TOpenErr, TExecErr, TCloseErr>(
  openFunc: (openCallback: (openErr?: TOpenErr) => void) => TDisposable,
  execFunc: (disposable: TDisposable) => Promise<void>,
  closeFunc: (
    disposable: TDisposable,
    closeCallback: (closeErr?: TCloseErr) => void
  ) => void
): Promise<void> => {
  const promise = new Promise<void>((resolve, reject) => {
    execWithPromArgs<TDisposable, TOpenErr, TExecErr, TCloseErr>({
      resolve: resolve,
      reject: reject,
      openFunc: (rj, openCallback) =>
        openFunc((openErr) => openCallback(rj, openErr)),
      execFunc: (rj, disposable) => execFunc(disposable),
      closeFunc: (rs, rj, disposable, closeCallback) =>
        closeFunc(disposable, (closeErr) => closeCallback(rs, rj, closeErr)),
    });
  });

  return promise;
};

export const execWithDispSafe = <TDisposable, TOpenErr, TExecErr, TCloseErr>(
  openFunc: (openCallback: (openErr?: TOpenErr) => void) => TDisposable,
  execFunc: (disposable: TDisposable) => Promise<void>,
  closeFunc: (
    disposable: TDisposable,
    closeCallback: (closeErr?: TCloseErr) => void
  ) => void
): Promise<void> => {
  const promise = new Promise<void>((resolve, reject) => {
    execWithPromArgs<TDisposable, TOpenErr, TExecErr, TCloseErr>({
      resolve: resolve,
      reject: reject,
      openFunc: (rejectProm, openCallback) => {
        let disposable: TDisposable | undefined = undefined;

        try {
          disposable = openFunc((openErr) => openCallback(rejectProm, openErr));
        } catch (unhandledOpenErr) {
          rejectProm({
            unhandledOpenErr: unhandledOpenErr,
          } as SafeDisposableError<TOpenErr, TExecErr, TCloseErr>);
        }

        return disposable as TDisposable;
      },
      execFunc: (rejectProm, disposable) => {
        let execProm: Promise<void> | undefined = undefined;

        try {
          execProm = execFunc(disposable);
        } catch (unhandledExecErr) {
          rejectProm({
            unhandledExecErr: unhandledExecErr,
          } as SafeDisposableError<TOpenErr, TExecErr, TCloseErr>);
        }

        execProm = execProm ?? new Promise<void>((rs, rj) => rs());
        return execProm;
      },
      closeFunc: (resolveProm, rejectProm, disposable, closeCallback) => {
        try {
          closeFunc(disposable, (closeErr) =>
            closeCallback(resolveProm, rejectProm, closeErr)
          );
        } catch (unhandledCloseErr) {
          rejectProm({
            unhandledCloseErr: unhandledCloseErr,
          } as SafeDisposableError<TOpenErr, TExecErr, TCloseErr>);
        }
      },
    });
  });

  return promise;
};
