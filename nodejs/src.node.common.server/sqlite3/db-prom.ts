import sqlite3 from "sqlite3";

import { executeWithDisposable } from "../../src.common/async/disposable.js";

export const executeWithDb = <TExecErr>(
  dbFileName: string,
  callback: (db: sqlite3.Database) => Promise<void>
): Promise<void> => {
  const promise = executeWithDisposable<
    sqlite3.Database,
    Error | null,
    TExecErr,
    Error | null
  >(
    (openCallback) => new sqlite3.Database(dbFileName, openCallback),
    callback,
    (db, closeCallback) => db.close(closeCallback)
  );

  return promise;
};

export const executeWithStmt = <TExecErr>(
  db: sqlite3.Database,
  stmtSql: string,
  callback: (db: sqlite3.Database, stmt: sqlite3.Statement) => Promise<void>
): Promise<void> => {
  const promise = executeWithDisposable<
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
  );

  return promise;
};
