export class AppConsole {
  public logEnabled = false;
  public debugEnabled = false;
  public traceEnabled = false;
  public warnEnabled = false;
  public infoEnabled = false;
  public errorEnabled = false;

  log(message?: any, ...optionalParams: any[]) {
    // info, warn, trace, error
    if (this.logEnabled) {
      if (typeof message === "undefined" && optionalParams.length === 0) {
        console.log();
      } else {
        console.log(message, ...optionalParams);
      }
    }
  }

  debug(message?: any, ...optionalParams: any[]) {
    if (this.debugEnabled) {
      if (typeof message === "undefined" && optionalParams.length === 0) {
        console.debug();
      } else {
        console.debug(message, ...optionalParams);
      }
    }
  }

  trace(message?: any, ...optionalParams: any[]) {
    if (this.traceEnabled) {
      if (typeof message === "undefined" && optionalParams.length === 0) {
        console.trace();
      } else {
        console.trace(message, ...optionalParams);
      }
    }
  }

  info(message?: any, ...optionalParams: any[]) {
    if (this.infoEnabled) {
      if (typeof message === "undefined" && optionalParams.length === 0) {
        console.info();
      } else {
        console.info(message, ...optionalParams);
      }
    }
  }

  warn(message?: any, ...optionalParams: any[]) {
    if (this.warnEnabled) {
      if (typeof message === "undefined" && optionalParams.length === 0) {
        console.warn();
      } else {
        console.warn(message, ...optionalParams);
      }
    }
  }

  error(message?: any, ...optionalParams: any[]) {
    if (this.errorEnabled) {
      if (typeof message === "undefined" && optionalParams.length === 0) {
        console.error();
      } else {
        console.error(message, ...optionalParams);
      }
    }
  }
}

export const appConsole = new AppConsole();

appConsole.logEnabled = true;
appConsole.debugEnabled = true;
appConsole.traceEnabled = true;
appConsole.warnEnabled = true;
appConsole.infoEnabled = true;
appConsole.errorEnabled = true;
