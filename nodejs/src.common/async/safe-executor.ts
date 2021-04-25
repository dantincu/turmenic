export interface SafeExecutorOpts {
  onUnhandled: ((err: any) => boolean | undefined) | null | undefined;
}

export interface ExecuteSafeOpts {
  onUnhandled?: ((err: any) => boolean | undefined) | null | undefined;
}

export class SafeExecutor {
  opts: SafeExecutorOpts;
  fatalOcurred: boolean;

  constructor(opts: SafeExecutorOpts) {
    this.opts = opts;
    this.fatalOcurred = false;
  }

  public executeSafe(
    func: () => void,
    opts?: ExecuteSafeOpts | null | undefined
  ) {
    try {
      if (this.fatalOcurred === false) {
        // const normOpts = this.getNormOpts(opts);
        func();
      }
    } catch (err) {
      const normOpts = this.getNormOpts(opts);
      this.handleError(err, normOpts);
    }
  }

  getNormOpts(opts?: ExecuteSafeOpts | null | undefined) {
    const normOpts = opts ?? {};
    return opts;
  }

  handleError(err: any, opts: ExecuteSafeOpts) {
    let fatal: boolean | undefined = undefined;

    if (opts.onUnhandled) {
      fatal = opts.onUnhandled(err);
    } else {
      fatal = this.opts.onUnhandled(err);
    }

    this.fatalOcurred = fatal ?? true;
  }
}
