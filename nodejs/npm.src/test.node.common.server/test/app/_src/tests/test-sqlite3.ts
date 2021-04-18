import {
  envConfig,
  envBaseDir,
} from "../src.node.common/appSettings/envConfig.js";

import {
  ManagedDb,
  ManagedDbOpts,
} from "../src.node.common.server/sqlite3/managed-db.js";
import sqlite3 from "sqlite3";

const appEnv = await envConfig.appEnv.instance();
const dbFilePath = appEnv.getEnvRelPath(
  envBaseDir.data,
  "sqlite3-data",
  "sqlite3.db"
);

console.log("dbFilePath", dbFilePath);

const managedDb = new ManagedDb({
  dbFilePath: dbFilePath,
});

const test1 = async () => {
  await managedDb.execPromWithDb((db, resolve, reject) => {
    const rejectedArr: Error[] = [];

    const addErrIfNotNull = (err: Error | null) => {
      if (err) {
        console.log("addErrIfNotNull", err);
        rejectedArr.push(err);
      }

      const retVal = !!err;
      return retVal;
    };

    const executeCallback = <T>(
      args: {
        opName: string;
        stmt: string | null;
        err: Error | null;
        data?: T | undefined;
        name?: string | undefined;
      },
      callback: (err: Error | null, data?: T) => void,
      stopIfErr?: boolean | undefined
    ) => {
      const msgParts = [args.opName];

      if (typeof args.stmt === "string") {
        msgParts.push(args.stmt);
      }

      if (typeof args.name === "string") {
        msgParts.push(`err ${args.name}`);
      } else {
        msgParts.push("err");
      }

      const msg = msgParts.join(" >>>> ");

      if (typeof args.data !== "undefined") {
        console.log(msg, args.err, args.data);
      } else {
        console.log(msg, args.err);
      }

      const hasErr = addErrIfNotNull(args.err);

      if (!hasErr || !stopIfErr) {
        console.log("Executing the callback", args.err, args.data);
        callback(args.err, args.data);
      } else {
        console.log("rejecting main method", rejectedArr);
        reject(rejectedArr);
      }
    };

    const run = (
      stmt: string,
      callback: (err: Error | null) => void,
      stopIfErr?: boolean
    ) => {
      db.run(stmt, (err) => {
        executeCallback(
          {
            opName: "run",
            err: err,
            stmt: stmt,
          },
          callback,
          stopIfErr
        );
      });
    };

    const prepare = (
      stmt: string,
      callback: (err: Error | null) => void,
      stopIfErr?: boolean
    ) => {
      const retStmt = db.prepare(stmt, (err) => {
        executeCallback(
          {
            opName: "prepare",
            err: err,
            stmt: stmt,
          },
          callback,
          stopIfErr
        );
      });

      return retStmt;
    };

    const stmtRun = (
      stmt: sqlite3.Statement,
      params: any,
      callback: (err: Error | null) => void,
      stopIfErr?: boolean
    ) => {
      stmt.run(params, (err) => {
        executeCallback(
          {
            opName: "stmt run with params",
            err: err,
            stmt: JSON.stringify(params),
          },
          callback,
          stopIfErr
        );
      });
    };

    const finalize = (
      stmt: sqlite3.Statement,
      callback: (err: Error | null) => void,
      stopIfErr?: boolean
    ) => {
      stmt.finalize((err) => {
        executeCallback(
          {
            opName: "finalize",
            err: err,
            stmt: null,
          },
          callback,
          stopIfErr
        );
      });
    };

    const each = (
      stmt: string,
      callback: (err: Error | null, row: any) => void,
      completed: (err: Error | null, count: number) => void,
      stopIfErr?: boolean
    ) => {
      db.each(
        stmt,
        (err, row) => {
          executeCallback(
            {
              opName: "each",
              err: err,
              stmt: stmt,
              data: row,
              name: "row",
            },
            callback,
            stopIfErr
          );
        },
        (err, count) => {
          executeCallback(
            {
              opName: "each",
              err: err,
              stmt: stmt,
              data: count,
              name: "count",
            },
            completed as (err: Error | null, data?: number | undefined) => void,
            stopIfErr
          );
        }
      );
    };

    run(
      "DROP TABLE IF EXISTS lorem",
      (err) => {
        run(
          "CREATE TABLE lorem (info TEXT, col1, col2 NUM)",
          (err) => {
            const stmt = prepare(
              "INSERT INTO lorem VALUES ($arg1, $arg2, $arg3)",
              (err) => {
                for (let i = 0; i < 10; i++) {
                  stmtRun(
                    stmt,
                    {
                      $arg1: "Ipsum " + i,
                      $arg2: "Ipsum " + i,
                      $arg3: i,
                    },
                    (err) => {
                      if (i === 9) {
                        finalize(
                          stmt,
                          (err) => {
                            each(
                              "SELECT rowid AS id, info, col1, col2 FROM lorem",
                              (err, row) => {},
                              (err, count) => {
                                console.log(
                                  "Executing the last callback",
                                  count
                                );
                                resolve();
                              },
                              true
                            );
                          },
                          true
                        );
                      }
                    },
                    true
                  );
                }
              },
              true
            );
          },
          true
        );
      },
      true
    );
  });
};

const test2 = async () => {
  await managedDb.executeWithDb(
    (db): Promise<void> => {
      const promise = new Promise<void>((resolve, reject) => {
        db.serialize(() => {
          db.run("DROP TABLE IF EXISTS lorem");
          db.run("CREATE TABLE lorem (info TEXT)");

          var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
          for (var i = 0; i < 10; i++) {
            stmt.run("Ipsum " + i);
          }
          stmt.finalize();

          db.each(
            "SELECT rowid AS id, info FROM lorem",
            function (err, row) {
              console.log(row.id + ": " + row.info);
            },
            (err, count) => {
              if (err) {
                reject(err);
              } else {
                resolve();
              }
            }
          );
        });
      });

      return promise;
    }
  );
};

await test2();

console.log("test successfull");
