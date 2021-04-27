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

const test0 = async () => {
  try {
    const db = new sqlite3.Database(dbFilePath);

    db.serialize(function () {
      /* db.run("DROP TABLE IF EXISTS lorem");
      db.run("CREATE TABLE lorem (info TEXT)"); */

      try {
        db.run("BEGIN;");
        var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
        for (var i = 0; i < 10; i++) {
          stmt.run("Ipsum " + i);
        }
        stmt.finalize();

        db.each("SELECT rowid AS id, info FROM lorem", function (err, row) {
          appConsole.log(row.id + ": " + row.info);
        });

        throw new Error("asdf");
        db.run("COMMIT;");
      } catch (err) {
        db.run("ROLLBACK;");
      }
    });

    appConsole.log("Closing the db");
    db.close();
    appConsole.log("The db closed");
  } catch (err) {
    appConsole.error("ERROR", err);
  }
};

const managedDb = new ManagedDb({
  dbFilePath: dbFilePath,
  onUnhandled: (err) => {
    return false;
  },
});

const test1 = async () => {
  await managedDb.serialize((db) => {
    // db.run("DROP TABLE IF EXISTS lorem");
    // db.run("CREATE TABLE lorem (info TEXT)");

    var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
    for (var i = 0; i < 10; i++) {
      stmt.run("Ipsum " + i);
    }
    stmt.finalize();

    managedDb.each("SELECT rowid AS id, info FROM lorem", {}, (err, row) => {
      appConsole.log(row.id + ": " + row.info);
    });

    const countProm = managedDb.each(
      "SELECT rowid AS id, info FROM lorem",
      {},
      (err, row) => {
        appConsole.log(row.id + ": " + row.info, err);
      }
    );

    appConsole.log("countProm : " + countProm);
    return true;
  });
};

const test2 = async () => {
  await managedDb.executeWithTranCoreAsync(async (db) => {
    db.run("DROP TABLE IF EXISTS lorem");
    db.run("CREATE TABLE lorem (info TEXT)");

    var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
    for (var i = 0; i < 10; i++) {
      stmt.run("Ipsum " + i);
    }
    stmt.finalize();

    const count = await managedDb.each(
      "SELECT rowid AS id, info FROM lorem",
      {},
      (err, row) => {
        appConsole.log(row.id + ": " + row.info, err);
      }
    );

    appConsole.log("count : " + count);
    return true;
  });
};

try {
  /* appConsole.log("RUNNING TEST 1");
  await test1(); */

  /* appConsole.log("RUNNING TEST 2");
  await test2(); */

  appConsole.log("test successfull");
} catch (err) {
  appConsole.error("caught error", err);
} finally {
  managedDb.closeDb();
  appConsole.log("db closed");
}

/* appConsole.log("RUNNING TEST 0");
await test0(); */
