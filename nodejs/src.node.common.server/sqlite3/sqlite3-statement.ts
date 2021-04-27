import sqlite3 from "sqlite3";
import { TransactionDatabase } from "sqlite3-transactions";
import { MutexInterface } from "async-mutex";

import { appConsole } from "../../src.common/logging/appConsole.js";
import { normalizePath } from "../../src.node.common/fileSystem/path.js";
import { AsyncMutex } from "../../src.node.common/async/async-mutex.js";

import { Sqlite3Base } from "./sqlite3.base.js";

export class Sqlite3Statement extends Sqlite3Base {
  db: sqlite3.Database;
  stmt: sqlite3.Statement;

  constructor(db: sqlite3.Database, stmt: sqlite3.Statement) {
    super();

    this.db = db;
    this.stmt = stmt;
  }

  public finalize(): Promise<void> {
    const promise = this.runAsPromise((callback) => {
      this.stmt.finalize((err) => {
        callback(err);
      });
    });

    return promise;
  }

  public run(params: any): Promise<void> {
    const promise = this.runAsPromise((callback) => {
      this.stmt.run(params, callback);
    });

    return promise;
  }

  public get(params: any): Promise<any | undefined> {
    const promise = this.getAsPromise<any | undefined>((callback) => {
      this.stmt.get(params, callback);
    });

    return promise;
  }

  public all(params: any): Promise<any[]> {
    const promise = this.getAsPromise<any[]>((callback) => {
      this.stmt.all(params, callback);
    });

    return promise;
  }

  public each(params: any, callback: (err: Error | null, row: any) => void) {
    const promise = this.getAsPromise<number>((innerCallback) => {
      this.stmt.each(params, callback, innerCallback);
    });

    return promise;
  }
}
