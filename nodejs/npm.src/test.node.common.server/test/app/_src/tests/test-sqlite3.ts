import sqlite3 from "sqlite3";

import { appConsole } from "../src.common/logging/appConsole.js";

import {
  envConfig,
  envBaseDir,
} from "../src.node.common/appSettings/envConfig.js";

import {
  ManagedDb,
  ManagedDbOpts,
} from "../src.node.common.server/sqlite3/managed-db.js";

const appEnv = await envConfig.appEnv.instance();
const dbFilePath = appEnv.getEnvRelPath(
  envBaseDir.data,
  "sqlite3-data",
  "sqlite3.db"
);

appConsole.log("dbFilePath", dbFilePath);

const managedDb = new ManagedDb({
  dbFilePath: dbFilePath,
});

const test1 = async () => {
  await managedDb.executeWithDb<Error>(
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
              appConsole.log(row.id + ": " + row.info);
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

        throw new Error("asdfasdfasdf");
      });

      promise.then(
        () => {},
        (err) => {
          appConsole.log("eeeeeerrooooooor", err);
        }
      );

      return promise;
    }
  );
};

const test2 = async () => {
  await managedDb.executeWithDb<Error>(
    (db): Promise<void> => {
      const promise = new Promise<void>((resolve, reject) => {
        db.serialize(() => {
          db.run("DROP TABLE IF EXISTS lorem");
          db.run("CREATE TABLE lorem (info TEXT)");

          managedDb
            .executeWithStmt(
              db,
              "INSERT INTO lorem VALUES (?)",
              async (db, stmt) => {
                for (var i = 0; i < 10; i++) {
                  stmt.run("Ipsum " + i);
                }

                throw new Error("asdfasdfasdf");
              }
            )
            .then(
              () => {
                db.each(
                  "SELECT rowid AS id, info FROM lorem",
                  function (err, row) {
                    appConsole.log(row.id + ": " + row.info);
                  },
                  (err, count) => {
                    if (err) {
                      reject(err);
                    } else {
                      resolve();
                    }
                  }
                );
              },
              (stmtErr) => {
                appConsole.log("stmtErr", stmtErr);
                reject(stmtErr);
              }
            );
        });
      });

      promise.then(
        () => {},
        (err) => {
          appConsole.log("eeeeeerrooooooor2", err);
        }
      );

      return promise;
    }
  );
};

appConsole.log("RUNNING TEST 1");
await test1();

appConsole.log("RUNNING TEST 2");
await test2();

appConsole.log("test successfull");
