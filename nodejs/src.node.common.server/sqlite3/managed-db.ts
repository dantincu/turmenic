import sqlite3 from "sqlite3";
import { TransactionDatabase } from "sqlite3-transactions";
import { MutexInterface } from "async-mutex";

import { appConsole } from "../../src.common/logging/appConsole.js";
import { normalizePath } from "../../src.node.common/fileSystem/path.js";
import { AsyncMutex } from "../../src.node.common/async/async-mutex.js";

export interface ManagedDbOpts {
  dbFilePath: string;
  onUnhandled: (err: any) => boolean | undefined;
}

export interface DbStatement {
  stmtText: string;
  stmtParamsArr?: any[] | null | undefined;
}

const asyncMutex = new AsyncMutex();

export class ManagedDb {
  opts: ManagedDbOpts;

  db: sqlite3.Database;
  tranDb: TransactionDatabase;

  fatalOcurred: boolean;
  dbClosed: boolean;

  constructor(opts: ManagedDbOpts) {
    this.opts = this.normalizeOpts(opts);

    this.db = new sqlite3.Database(opts.dbFilePath);
    this.tranDb = new TransactionDatabase(this.db);

    this.fatalOcurred = false;
    this.dbClosed = false;

    this.logInit();
  }

  public closeDb() {
    if (this.dbClosed === false) {
      this.db.close();
      this.dbClosed = true;
    }
  }

  public get(sql: string, params: any) {
    const promise = new Promise<any>((resolve, reject) => {
      this.db.get(sql, params, (err: Error | null, row: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });

    return promise;
  }

  public all(sql: string, params: any) {
    const promise = new Promise<any[]>((resolve, reject) => {
      this.db.all(sql, params, (err: Error | null, rows: any[]) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });

    return promise;
  }

  public each(
    sql: string,
    params: any,
    callback: (err: Error | null, row: any) => void
  ) {
    console.log("each");

    const promise = new Promise<number>((resolve, reject) => {
      console.log("each promise");
      this.db.each(
        sql,
        params,
        (err, row) => {
          console.log("each row", err, row);
          callback(err, row);
        },
        (err: Error | null, count: number) => {
          console.log("each complete", err, count);
          if (err) {
            reject(err);
          } else {
            resolve(count);
          }
        }
      );
    });

    return promise;
  }

  public async executeWithTranAsync(
    callback: (db: sqlite3.Database) => Promise<boolean>,
    onUnhandled?: ((err: any) => boolean | undefined) | null | undefined,
    errIsFatal?: boolean | null | undefined
  ) {
    let retVal = false;

    if (this.fatalOcurred === false) {
      await this.acquireMutex(async (release) => {
        const retVal = await this.executeWithTranCoreAsync(
          callback,
          onUnhandled,
          release,
          errIsFatal
        );
      });
    }

    return retVal;
  }

  public async executeAsync(
    callback: (db: sqlite3.Database) => boolean,
    onUnhandled?: ((err: any) => boolean | undefined) | null | undefined,
    errIsFatal?: boolean | null | undefined
  ) {
    let retVal = false;

    if (this.fatalOcurred === false) {
      try {
        retVal = await callback(this.tranDb);
      } catch (err) {
        this.callUnhandled(err, onUnhandled, null, errIsFatal);
      }
    }

    return retVal;
  }

  public async serialize(
    callback: (db: sqlite3.Database) => boolean,
    onUnhandled?: ((err: any) => boolean | undefined) | null | undefined,
    errIsFatal?: boolean | null | undefined
  ) {
    let retVal = false;

    if (this.fatalOcurred === false) {
      await this.acquireMutex(async (release) => {
        const executeCore = (callback: (db: sqlite3.Database) => boolean) => {
          const retVal = this.executeCore(
            callback,
            onUnhandled,
            release,
            errIsFatal
          );
          return retVal;
        };

        retVal = executeCore((db) => {
          let retVal = false;

          db.serialize(() => {
            executeCore((db) => {
              retVal = callback(db);
              return retVal;
            });
          });

          return retVal;
        });
      });
    }

    return retVal;
  }

  public execute(
    callback: (db: sqlite3.Database) => boolean,
    onUnhandled?: ((err: any) => boolean | undefined) | null | undefined,
    errIsFatal?: boolean | null | undefined
  ) {
    let retVal = false;

    if (this.fatalOcurred === false) {
      try {
        retVal = callback(this.db);
      } catch (err) {
        this.callUnhandled(err, onUnhandled, null, errIsFatal);
      }
    }

    return retVal;
  }

  executeCore(
    callback: (db: sqlite3.Database) => boolean,
    onUnhandled?: ((err: any) => boolean | undefined) | null | undefined,
    release?: MutexInterface.Releaser | null | undefined,
    isFatal?: boolean | null | undefined
  ) {
    let retVal = false;

    if (this.fatalOcurred === false) {
      try {
        retVal = callback(this.db);
      } catch (err) {
        this.callUnhandled(err, onUnhandled, release, isFatal);
      }
    }

    return retVal;
  }

  async executeCoreAsync(
    callback: (db: sqlite3.Database) => Promise<boolean>,
    onUnhandled?: ((err: any) => boolean | undefined) | null | undefined,
    release?: MutexInterface.Releaser | null | undefined,
    errIsFatal?: boolean | null | undefined,
    db?: sqlite3.Database | null | undefined
  ) {
    let retVal = false;

    if (this.fatalOcurred === false) {
      try {
        retVal = await callback(db ?? this.db);
      } catch (err) {
        this.callUnhandled(err, onUnhandled, release, errIsFatal);
      }
    }

    return retVal;
  }

  executeWithTranCoreAsync(
    callback: (
      db: sqlite3.Database,
      tranDb: sqlite3.Database
    ) => Promise<boolean>,
    onUnhandled?: ((err: any) => boolean | undefined) | null | undefined,
    release?: MutexInterface.Releaser | null | undefined,
    errIsFatal?: boolean | null | undefined
  ) {
    console.log("executeWithTranCoreAsync--");
    const executeCoreAsync = async (
      callback: (db: sqlite3.Database) => Promise<boolean>,
      db?: sqlite3.Database | null | undefined
    ) => {
      console.log("executeCoreAsync--1");
      const retVal = await this.executeCoreAsync(
        callback,
        onUnhandled,
        release,
        errIsFatal,
        db
      );

      return retVal;
    };

    executeCoreAsync((db) => {
      console.log("executeCoreAsync--2");
      const promise = new Promise<boolean>((resolve, reject) => {
        console.log("executeCoreAsync-3");
        this.tranDb.beginTransaction((err, tranDb: sqlite3.Database) => {
          console.log("beginTransaction--");
          if (err) {
            reject(err);
          } else {
            executeCoreAsync((db) => {
              console.log("beginTransaction--1");
              const retProm = callback(this.db, tranDb);
              retProm.then((value) => {
                if (value) {
                  (tranDb as any).commit((err) => {
                    if (err) {
                      reject(err);
                    } else {
                      resolve(value);
                    }
                  });
                } else {
                  (tranDb as any).rollback((err) => {
                    if (err) {
                      reject(err);
                    } else {
                      resolve(value);
                    }
                  });
                }
              }, reject);

              return retProm;
            }, tranDb);
          }
        });
      });

      return promise;
    });
  }

  async acquireMutex(
    callback: (release: MutexInterface.Releaser) => Promise<void>
  ) {
    const release = await asyncMutex.acquire(this.opts.dbFilePath);
    await callback(release);
  }

  releaseMutex(release?: MutexInterface.Releaser | null | undefined) {
    if (release) {
      release();
    }
  }

  callUnhandled(
    err: any,
    onUnhandled?: ((err: any) => boolean | undefined) | null | undefined,
    release?: MutexInterface.Releaser | null | undefined,
    isFatal?: boolean | null | undefined
  ) {
    let retVal = true;
    this.releaseMutex(release);

    if (onUnhandled) {
      retVal = onUnhandled(err) ?? true;
    } else {
      retVal = this.opts.onUnhandled(err) ?? true;
    }

    if (isFatal !== false || retVal !== false) {
      this.fatalOcurred = true;
    }
  }

  normalizeOpts(opts: ManagedDbOpts) {
    opts.dbFilePath = normalizePath(opts.dbFilePath);
    return opts;
  }

  logInit() {
    appConsole.log("sqlite3 using db file path", this.opts.dbFilePath);
  }
}
