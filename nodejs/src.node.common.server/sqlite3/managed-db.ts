import sqlite3 from "sqlite3";

import { appConsole } from "../../src.common/logging/appConsole.js";
import { execPromWithDb } from "./db-async.js";
import { executeWithDb } from "./db-prom.js";

export interface ManagedDbOpts {
  dbFilePath: string;
}

export interface DbStatement {
  stmtText: string;
  stmtParamsArr?: any[] | null | undefined;
}

export class ManagedDb {
  opts: ManagedDbOpts;

  constructor(opts: ManagedDbOpts) {
    this.opts = opts;

    this.logInit();
  }

  public execPromWithDb(
    func: (
      db: sqlite3.Database,
      resolve: (value: void | PromiseLike<void>) => void,
      reject: (reason?: any) => void
    ) => void
  ) {
    const promise = execPromWithDb(this.opts.dbFilePath, func);
    return promise;
  }

  public async executeWithDb<TExecErr>(
    callback: (db: sqlite3.Database) => Promise<void>
  ) {
    await executeWithDb<TExecErr>(this.opts.dbFilePath, callback);
  }

  logInit() {
    appConsole.log("sqlite3 using db file path", this.opts.dbFilePath);
  }
}
