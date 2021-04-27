import sqlite3 from "sqlite3";

import { appConsole } from "../src.common/logging/appConsole.js";

import {
  envConfig,
  envBaseDir,
} from "../src.node.common/appSettings/envConfig.js";

import {
  Sqlite3Database,
  Sqlite3TransactionDatabase,
} from "../src.node.common.server/sqlite3/sqlite3-database.js";

import { Sqlite3Db } from "../src.node.common.server/sqlite3/sqlite3-db.js";

const appEnv = await envConfig.appEnv.instance();
const dbFilePath = appEnv.getEnvRelPath(
  envBaseDir.data,
  "sqlite3-data",
  "sqlite3.db"
);

appConsole.log("dbFilePath", dbFilePath);

const sqlite3Db = new Sqlite3Db(dbFilePath);

const runTest1 = async () => {
  await sqlite3Db.executeWithTranDbThreadSafe(async (tranDb, db) => {
    // await tranDb.run("DROP TABLE IF EXISTS lorem", {});
    await tranDb.run("CREATE TABLE IF NOT EXISTS lorem (info TEXT)", {});

    const stmt = await tranDb.prepare("INSERT INTO lorem VALUES (?)");

    for (var i = 0; i < 10; i++) {
      await stmt.run("Ipsum " + i);
    }

    await stmt.finalize();

    await tranDb.each("SELECT rowid AS id, info FROM lorem", {}, (err, row) => {
      appConsole.log(row.id + ": " + row.info, err);
    });

    await tranDb.rollback();
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
