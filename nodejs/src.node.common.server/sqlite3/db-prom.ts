import sqlite3 from "sqlite3";

import {
  SafePromise,
  SafePromiseError,
} from "../../src.common/async/safe-promise.js";

export const executeWithDb = (
  dbFileName: string,
  callback: (db: sqlite3.Database) => Promise<void>
): SafePromise<void> => {
  return new SafePromise<void>(
    new Promise<void>((resolve, reject) => {
      const db = new sqlite3.Database(dbFileName);
      callback(db).then(resolve, reject);
    })
  );
};

export const executeWithStmt = (
  db: sqlite3.Database,
  stmtSql: string,
  callback: (db: sqlite3.Database, stmt: sqlite3.Statement) => Promise<void>
): SafePromise<void> => {
  return new SafePromise<void>(
    new Promise<void>((resolve, reject) => {
      const stmt = db.prepare(stmtSql);
      callback(db, stmt).then(resolve, reject);
    })
  );
};
