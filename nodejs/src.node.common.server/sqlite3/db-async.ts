import sqlite3 from "sqlite3";

import { appConsole } from "../../src.common/logging/appConsole.js";

/*
export const openDbAsync = (fileName: string) => {
  const promise = new Promise<sqlite3.Database>((resolve, reject) => {
    const db = new sqlite3.Database(fileName, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(db);
      }
    });
  });

  return promise;
};

export const closeDbAsync = (db: sqlite3.Database) => {
  const promise = new Promise<void>((resolve, reject) => {
    db.close((err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
  return promise;
};

export const executeSafeAsync = async (
  fileName: string,
  func: (db: sqlite3.Database) => Promise<void>
) => {
  const db = await openDbAsync(fileName);

  try {
    await func(db);
  } finally {
    await db.close();
  }
};

export const executeSafe = async (
  fileName: string,
  func: (db: sqlite3.Database) => void
) => {
  const db = await openDbAsync(fileName);

  try {
    func(db);
  } finally {
    await db.close();
  }
};

export const executeSerializedAsync = async (
  fileName: string,
  func: (db: sqlite3.Database) => Promise<void>
) => {
  const db = await openDbAsync(fileName);
  let prom: Promise<void> | null = null;

  try {
    db.serialize(() => {
      prom = func(db);
    });

    await prom;
  } finally {
    await db.close();
  }
};

export const executeParalelizedAsync = async (
  fileName: string,
  func: (db: sqlite3.Database) => Promise<void>
) => {
  const db = await openDbAsync(fileName);
  let prom: Promise<void> | null = null;

  try {
    db.parallelize(() => {
      prom = func(db);
    });

    await prom;
  } finally {
    await db.close();
  }
};
*/

export const execPromWithDb = (
  fileName: string,
  func: (
    db: sqlite3.Database,
    resolve: (value: void | PromiseLike<void>) => void,
    reject: (reason?: any) => void
  ) => void
): Promise<void> => {
  const promise = new Promise<void>((resolve, reject) => {
    const db = new sqlite3.Database(fileName, (err) => {
      if (err) {
        reject(err);
      } else {
        try {
          appConsole.log("executing promise", db, resolve, reject);
          func(db, resolve, reject);
        } catch (err) {
          reject(err);
        } finally {
          db.close();
        }
      }
    });
  });

  return promise;
};
