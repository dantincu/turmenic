export class AppConsole {
  public logEnabled = false;
  public debugEnabled = false;

  log(...data: any[]) {
    if (this.logEnabled) {
      console.log.apply(this, data);
    }
  }

  debug(...data: any[]) {
    if (this.debugEnabled) {
      console.debug.apply(this, data);
    }
  }
}

export const appConsole = new AppConsole();
appConsole.logEnabled = true;
appConsole.debugEnabled = true;
