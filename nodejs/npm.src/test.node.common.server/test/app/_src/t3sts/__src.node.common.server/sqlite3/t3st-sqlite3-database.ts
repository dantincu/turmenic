import sqlite3 from "sqlite3";

import { appConsole } from "../../../../../../src.common/logging/appConsole.js";

import {
  envConfig,
  envBaseDir,
} from "../../../../../../src.node.common/appSettings/envConfig.js";

import {
  Sqlite3Database,
  Sqlite3TransactionDatabase,
} from "../../../../sqlite3-database.js";

import { Sqlite3Db } from "../../../../sqlite3-db.js";

const appEnv = await envConfig.appEnv.instance();
const dbFilePath = appEnv.getEnvRelPath(
  envBaseDir.data,
  "sqlite3",
  "data",
  "sqlite3.db"
);

appConsole.log("dbFilePath", dbFilePath);

const sqlite3Db = new Sqlite3Db(dbFilePath);

const runTest0 = async () => {
  await sqlite3Db.executeWithTranDbThreadSafe(async (tranDb, db) => {
    const rows = await db.all("SELECT * FROM sqlite_schema", {});
    appConsole.log("sqlite_schema", rows);
  });
};

const runTest1 = async () => {
  await sqlite3Db.executeWithTranDbThreadSafe(async (tranDb, db) => {
    // await tranDb.run("DROP TABLE IF EXISTS lorem", {});

    const catchIntentionalError = async (msg: number | string) => {
      try {
        const result = await tranDb.all(
          "SELECT rowid AS idd, info FROM loremm",
          {}
        );
        appConsole.log(
          "While intentionally trying to trigger an error",
          result
        );
      } catch (err) {
        appConsole.error(`Intentional error ${msg}`, err);
      }
    };

    await catchIntentionalError(1);
    // await tranDb.run("DROP TABLE IF EXISTS lorem", {});
    await tranDb.run("CREATE TABLE IF NOT EXISTS lorem (info TEXT)", {});

    await catchIntentionalError(2);
    const stmt = await tranDb.prepare("INSERT INTO lorem VALUES (?)");

    await catchIntentionalError(3);

    for (var i = 0; i < 10; i++) {
      await stmt.run("Ipsum " + i);
    }

    await catchIntentionalError(4);
    await stmt.finalize();

    await catchIntentionalError(5);

    await tranDb.each("SELECT rowid AS id, info FROM lorem", {}, (err, row) => {
      appConsole.log(row.id + ": " + row.info, err);
    });

    await tranDb.commit();
    // throw new Error("Error trigerring rollback");
  });
};

const runAllTests = async () => {
  appConsole.log("RUNNING TEST 1");
  await runTest1();
};

try {
  await runAllTests();
} catch (err) {
  appConsole.error("RUN ALL TESTS ERR", err);
}
