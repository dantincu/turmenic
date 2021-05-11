import assert from "assert";
import { describe, it } from "mocha";
import sqlite3 from "sqlite3";

import {
  assureJsValIsBit,
  jsToDbVal,
  getDataTypeConvertor,
  dbToJsVal,
  assurePropValid,
  assureJsValIsInt,
  isDbNull,
  assureJsValIsPositiveNumber,
  assureJsValOfType,
  convertJsValue,
} from "../../../../src.node.common.server/sqlite3/entity-sql/db-types-validators.js";

import {
  PropJsType,
  ColumnDbType,
  Sqlite3DbError,
} from "../../../../src.node.common.server/sqlite3/entity-sql/db-types.js";

import {
  assertThrowsSqlite3DbError,
  sampleFloatNumbers,
  sampleNegativeFloatNumbers,
  sampleIntNumbers,
  sampleNegativeIntNumbers,
  sampleProductsArr,
  Product,
} from "./entity-sql-tests.base.js";

import { getCallingModuleRelFilePath } from "../../../../src.node.common/stacktracey/stacktracey.js";
import { redirectStdStreams } from "../../../../src.node.common/testing/process.stream.js";

import { appConsole } from "../../../../src.common/logging/appConsole.js";

import {
  envConfig,
  envBaseDir,
} from "../../../../src.node.common/appSettings/envConfig.js";

import {
  Sqlite3Database,
  Sqlite3TransactionDatabase,
} from "../../../../src.node.common.server/sqlite3/sqlite3-database.js";

import { forEachAsync } from "../../../../src.common/arrays/arrays-async.js";
import { arraysAreEqual } from "../../../../src.common/arrays/arr-diff.js";

import { Sqlite3Db } from "../../../../src.node.common.server/sqlite3/sqlite3-db.js";

const appEnv = await envConfig.appEnv.instance();

const dbFilePath = appEnv.getEnvRelPath(
  envBaseDir.data,
  "sqlite3",
  "data",
  "sqlite3-data.sql"
);

const sqlite3Db = new Sqlite3Db(dbFilePath);

describe("Sqlite3Db", async () => {
  describe("#Sqlite3Db.executeWithDbThreadSafe", async () => {
    it("does not throw", async () => {
      await sqlite3Db.executeWithTranDbThreadSafe(async (tranDb, db) => {
        await tranDb.run("DROP TABLE IF EXISTS Product", {});

        await tranDb.run(
          `CREATE TABLE IF NOT EXISTS Product (
          id INTEGER,
          name TEXT,
          price REAL,
          discount NUMERIC
        )`,
          {}
        );

        const stmt = await tranDb.prepare(
          "INSERT INTO Product VALUES ($id, $name, $price, $discount)"
        );

        await forEachAsync(sampleProductsArr, async (product) => {
          await stmt.run({
            $id: jsToDbVal(product.id, ColumnDbType.integer, true),
            $name: jsToDbVal(product.name, ColumnDbType.text, true),
            $price: jsToDbVal(product.price, ColumnDbType.real, true),
            $discount: jsToDbVal(product.discount, ColumnDbType.numeric, true),
          });
        });

        await stmt.finalize();
        const retProducts = (await tranDb.all("SELECT * FROM Product", {})).map(
          (product: Product) => {
            const retProduct: Product = {
              id: dbToJsVal(
                product.id,
                ColumnDbType.integer,
                PropJsType.number,
                true
              ),
              name: dbToJsVal(
                product.name,
                ColumnDbType.text,
                PropJsType.string,
                true
              ),
              price: dbToJsVal(
                product.price,
                ColumnDbType.real,
                PropJsType.number,
                true
              ),
              discount: dbToJsVal(
                product.discount,
                ColumnDbType.numeric,
                PropJsType.number,
                true
              ),
            };

            return retProduct;
          }
        );

        appConsole.log("sampleProductsArr", sampleProductsArr);
        appConsole.log("retProducts", retProducts);

        assert.strictEqual(
          arraysAreEqual(sampleProductsArr, retProducts),
          true,
          "The returned products array should be equal to the input one"
        );
      });
    });
  });
});
