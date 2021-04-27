import sqlite3 from "sqlite3";
import { TransactionDatabase } from "sqlite3-transactions";
import { MutexInterface } from "async-mutex";

import { appConsole } from "../../src.common/logging/appConsole.js";
import { normalizePath } from "../../src.node.common/fileSystem/path.js";
import { AsyncMutex } from "../../src.node.common/async/async-mutex.js";

import { Sqlite3Base } from "./sqlite3.base.js";
import { Sqlite3Statement } from "./sqlite3-statement.js";

export class Sqlite3Database extends Sqlite3Base {
  db: sqlite3.Database;
  tranDb: TransactionDatabase;

  constructor(db: sqlite3.Database) {
    super();

    this.db = db;
    this.tranDb = new TransactionDatabase(db, null);
  }

  public beginTransaction(): Promise<Sqlite3TransactionDatabase> {
    const promise = this.getAsPromise<sqlite3.Database>((callback) => {
      this.tranDb.beginTransaction(callback);
    }).then((value) => {
      const tranDb = new Sqlite3TransactionDatabase(value);
      return tranDb;
    });

    return promise;
  }

  public exec(sql: string): Promise<void> {
    const promise = this.runAsPromise((callback) => {
      this.db.exec(sql, callback);
    });

    return promise;
  }

  public prepare(sql: string): Promise<Sqlite3Statement> {
    const promise = this.returnAsPromise<sqlite3.Statement>((callback) => {
      const stmt = this.db.prepare(sql, callback);
      return stmt;
    }).then((value) => {
      const statement = new Sqlite3Statement(this.db, value);
      return statement;
    });

    return promise;
  }

  public close(): Promise<void> {
    const promise = this.runAsPromise((callback) => {
      this.db.close(callback);
    });

    return promise;
  }

  public run(sql: string, params: any): Promise<void> {
    const promise = this.runAsPromise((callback) => {
      this.db.run(sql, params, callback);
    });

    return promise;
  }

  public get(sql: string, params: any): Promise<any | undefined> {
    const promise = this.getAsPromise<any | undefined>((callback) => {
      this.db.get(sql, params, callback);
    });

    return promise;
  }

  public all(sql: string, params: any): Promise<any[]> {
    const promise = this.getAsPromise<any[]>((callback) => {
      this.db.all(sql, params, callback);
    });

    return promise;
  }

  public each(
    sql: string,
    params: any,
    callback: (err: Error | null, row: any) => void
  ) {
    const promise = this.getAsPromise<number>((innerCallback) => {
      this.db.each(sql, params, callback, innerCallback);
    });

    return promise;
  }
}

export class Sqlite3TransactionDatabase extends Sqlite3Database {
  public isCompleted: boolean;

  constructor(db: sqlite3.Database) {
    super(db);

    this.isCompleted = false;
  }

  public commit(): Promise<void> {
    const promise = this.runAsPromise((callback) => {
      if (this.isCompleted === false) {
        (this.db as any).commit((err) => {
          this.isCompleted = true;
          callback(err);
        });
        this.isCompleted = true;
      } else {
        callback(null);
      }
    });

    return promise;
  }

  public rollback(): Promise<void> {
    const promise = this.runAsPromise((callback) => {
      if (this.isCompleted === false) {
        (this.db as any).rollback((err) => {
          this.isCompleted = true;
          callback(err);
        });
        this.isCompleted = true;
      } else {
        callback(null);
      }
    });

    return promise;
  }
}
