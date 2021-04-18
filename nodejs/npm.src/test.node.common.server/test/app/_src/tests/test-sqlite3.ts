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
              }
            )
            .then(
              () => {
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
              },
              (stmtErr) => {
                console.log("stmtErr", stmtErr);
                reject(stmtErr);
              }
            );
        });
      });

      return promise;
    }
  );
};

console.log("RUNNING TEST 1");
await test1();

console.log("RUNNING TEST 2");
await test2();

console.log("test successfull");
