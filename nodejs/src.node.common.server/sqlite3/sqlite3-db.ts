import sqlite3 from "sqlite3";

import { appConsole } from "../../src.common/logging/appConsole.js";
import { normalizePath } from "../../src.node.common/fileSystem/path.js";
import { AsyncMutex } from "../../src.node.common/async/async-mutex.js";

import { Sqlite3Base } from "./sqlite3.base.js";
import { Sqlite3Statement } from "./sqlite3-statement.js";
import {
  Sqlite3Database,
  Sqlite3TransactionDatabase,
} from "./sqlite3-database.js";

const asyncMutex = new AsyncMutex();

export class Sqlite3Db extends Sqlite3Base {
  dbFilePath: string;

  constructor(dbFilePath: string) {
    super();
    this.dbFilePath = normalizePath(dbFilePath);
  }

  public async executeWithTranDbThreadSafe(
    callback: (
      tranDb: Sqlite3TransactionDatabase,
      db: Sqlite3Database
    ) => Promise<void>
  ) {
    await this.executeWithDbThreadSafe(async (db) => {
      const tranDb = await db.beginTransaction();

      try {
        await callback(tranDb, db);
        await tranDb.commit();
      } catch (err) {
        await tranDb.rollback();
        throw err;
      }
    });
  }

  public async executeWithDbThreadSafe(
    callback: (db: Sqlite3Database) => Promise<void>
  ) {
    await this.executeThreadSafe(async () => {
      await this.executeWithDb(callback);
    });
  }

  public async executeWithDb(callback: (db: Sqlite3Database) => Promise<void>) {
    let db: Sqlite3Database | undefined;

    try {
      db = await this.openDb();
      await callback(db);
    } finally {
      if (db) {
        db.close();
      }
    }
  }

  public async executeThreadSafe(callback: () => Promise<void>) {
    const release = await asyncMutex.acquire(this.dbFilePath);

    try {
      await callback();
    } finally {
      release();
    }
  }

  public async openDb() {
    const promise = this.returnAsPromise((callback) => {
      const db = new sqlite3.Database(this.dbFilePath, (err) => {
        callback(err);
      });
      return db;
    }).then((value) => {
      const db = new Sqlite3Database(value);
      return db;
    });

    return promise;
  }
}
