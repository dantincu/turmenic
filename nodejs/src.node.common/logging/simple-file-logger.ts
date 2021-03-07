// @ts-ignore
import SimpleNodeLogger from "simple-node-logger";
import { envConfig, envBaseDir } from "../appSettings/envConfig.js";
import { appConsole } from "../../src.common/logging/appConsole.js";

const appEnv = await envConfig.appEnv.instance();

export class Logger {
  private loggerName: string;
  private log: any;

  constructor(loggerName: string) {
    if (!loggerName) {
      throw new Error("Cannot instantiate a logger without a name!");
    }

    this.loggerName = loggerName;
    this.log = this.getLogger();
  }

  public trace(...data: any[]) {
    appConsole.log(...data);
    this.log.trace(...data);
  }

  public debug(...data: any[]) {
    appConsole.log(...data);
    this.log.debug(...data);
  }

  public info(...data: any[]) {
    appConsole.log(...data);
    this.log.info(...data);
  }

  public warn(...data: any[]) {
    appConsole.log(...data);
    this.log.warn(...data);
  }

  public error(...data: any[]) {
    appConsole.log(...data);
    this.log.error(...data);
  }

  public fatal(...data: any[]) {
    appConsole.log(...data);
    this.log.fatal(...data);
  }

  private getLoggerOptions() {
    const opts = {
      logDirectory: appEnv.getEnvRelPath(envBaseDir.logs), // NOTE: folder must exist and be writable...
      fileNamePattern: `${this.loggerName}-<DATE>.log`,
      dateFormat: "YYYY.MM.DD",
      timestampFormat: "YYYY-MM-DD HH:mm:ss.SSS",
    };

    return opts;
  }

  private getLogger() {
    const opts = this.getLoggerOptions();
    const log = SimpleNodeLogger.createRollingFileLogger(opts);

    log.setLevel("trace");
    return log;
  }
}

export const appLogger = new Logger("appLog");
