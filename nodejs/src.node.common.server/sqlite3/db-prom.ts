import sqlite3 from "sqlite3";

import {
  SafePromise,
  SafePromiseError,
} from "../../src.common/async/safe-promise";
// import { execWithDisp } from "../../src.common/async/disposable.js";

export const executeWithDb = <TExecErr>(
  dbFileName: string,
  callback: (db: sqlite3.Database) => Promise<void>
): SafePromise<void> => {
  /* const promise = execWithDisp<
    sqlite3.Database,
    Error | null,
    TExecErr,
    Error | null
  >(
    (openCallback) => new sqlite3.Database(dbFileName, openCallback),
    callback,
    (db, closeCallback) => db.close(closeCallback)
  ); */

  return new SafePromise<void>(
    new Promise<void>((resolve, reject) => {
      resolve();
    })
  );
};

export const executeWithStmt = <TExecErr>(
  db: sqlite3.Database,
  stmtSql: string,
  callback: (db: sqlite3.Database, stmt: sqlite3.Statement) => Promise<void>
): SafePromise<void> => {
  /* const promise = execWithDisp<
    sqlite3.Statement,
    Error | null,
    TExecErr,
    Error | null
  >(
    (openCallback) => db.prepare(stmtSql, openCallback),
    (stmt) => {
      const execPromise = callback(db, stmt);
      return execPromise;
    },
    (stmt, closeCallback) => stmt.finalize(closeCallback)
  ); */

  return new SafePromise<void>(
    new Promise<void>((resolve, reject) => {
      resolve();
    })
  );
};
