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

  public trace(message?: any, ...optionalParams: any[]) {
    appConsole.trace(message, ...optionalParams);
    this.log.trace([message, ...optionalParams]);
  }

  public debug(message?: any, ...optionalParams: any[]) {
    appConsole.debug(message, ...optionalParams);
    this.log.debug([message, ...optionalParams]);
  }

  public info(message?: any, ...optionalParams: any[]) {
    appConsole.info(message, ...optionalParams);
    this.log.info([message, ...optionalParams]);
  }

  public warn(message?: any, ...optionalParams: any[]) {
    appConsole.warn(message, ...optionalParams);
    this.log.warn([message, ...optionalParams]);
  }

  public error(message?: any, ...optionalParams: any[]) {
    appConsole.error(message, ...optionalParams);
    this.log.error([message, ...optionalParams]);
  }

  public fatal(message?: any, ...optionalParams: any[]) {
    appConsole.error(message, ...optionalParams);
    this.log.fatal([message, ...optionalParams]);
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
