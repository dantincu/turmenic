export class AppConsole {
  public logEnabled = false;
  public debugEnabled = false;

  log(...data: any[]) {
    if (this.logEnabled) {
      console.log(...data);
    }
  }

  debug(...data: any[]) {
    if (this.debugEnabled) {
      console.debug(...data);
    }
  }
}

export const appConsole = new AppConsole();
appConsole.logEnabled = true;
appConsole.debugEnabled = true;
