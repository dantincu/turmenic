import sqlite3 from "sqlite3";
import { TransactionDatabase } from "sqlite3-transactions";
import { MutexInterface } from "async-mutex";

import { appConsole } from "../../src.common/logging/appConsole.js";
import { normalizePath } from "../../src.node.common/fileSystem/path.js";
import { AsyncMutex } from "../../src.node.common/async/async-mutex.js";

export class Sqlite3Base {
  runAsPromise(func: (callback: (err: Error | null) => void) => void) {
    const promise = new Promise<void>((resolve, reject) => {
      try {
        func((err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      } catch (err) {
        reject(err);
      }
    });

    return promise;
  }

  returnAsPromise<T>(func: (callback: (err: Error | null) => void) => T) {
    const promise = new Promise<T>((resolve, reject) => {
      try {
        const value = func((err) => {
          if (err) {
            reject(err);
          } else {
            resolve(value);
          }
        });
      } catch (err) {
        reject(err);
      }
    });

    return promise;
  }

  getAsPromise<T>(
    func: (callback: (err: Error | null, data: T) => void) => void
  ) {
    const promise = new Promise<T>((resolve, reject) => {
      try {
        func((err, value) => {
          if (err) {
            reject(err);
          } else {
            resolve(value);
          }
        });
      } catch (err) {
        reject(err);
      }
    });

    return promise;
  }
}
