import sqlite3 from "sqlite3";

import { appConsole } from "../../src.common/logging/appConsole.js";
import { executeWithDb, executeWithStmt } from "./db-prom.js";

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

  public async executeWithDb<TExecErr>(
    callback: (db: sqlite3.Database) => Promise<void>
  ) {
    await executeWithDb<TExecErr>(this.opts.dbFilePath, callback);
  }

  public async executeWithStmt<TExecErr>(
    db: sqlite3.Database,
    stmtSql: string,
    callback: (db: sqlite3.Database, stmt: sqlite3.Statement) => Promise<void>
  ) {
    await executeWithStmt<TExecErr>(db, stmtSql, callback);
  }

  logInit() {
    appConsole.log("sqlite3 using db file path", this.opts.dbFilePath);
  }
}
