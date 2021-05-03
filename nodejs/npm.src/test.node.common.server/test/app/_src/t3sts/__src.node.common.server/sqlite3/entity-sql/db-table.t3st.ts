import {
  envBaseDir,
  envConfig,
} from "../../../../src.node.common/appSettings/envConfig.js";

import {
  DbTableBase,
  getCreateTableCmdSql,
  getDropTableCmdSql,
  getTableColumnSqlDef,
  getTableColumnsListSqlDef,
} from "../../../../src.node.common.server/sqlite3/entity-sql/db-table.js";
import {
  DbMetadata,
  DbMetadataEntity,
  DbMetadataEntityMappings,
} from "../../../../src.node.common.server/sqlite3/entity-sql/db-metadata.js";

import {
  Sqlite3TransactionDatabase,
  Sqlite3Database,
} from "../../../../src.node.common.server/sqlite3/sqlite3-database.js";
import { appConsole } from "../../../../src.common/logging/appConsole.js";

const appEnv = await envConfig.appEnv.instance();

const tableMapping = new DbMetadataEntityMappings();

const dbMetadataTable = new DbTableBase({
  tableMapping: tableMapping,
  dbBaseDirPath: appEnv.getEnvRelPath(envBaseDir.data, "sqlite3"),
});

const runTest1 = async () => {
  appConsole.log(
    "getCreateTableCmdSql(tableMapping)",
    getCreateTableCmdSql(tableMapping)
  );

  appConsole.log(
    "getCreateTableCmdSql(tableMapping, true)",
    getCreateTableCmdSql(tableMapping, true)
  );

  appConsole.log(
    "getDropTableCmdSql(tableMapping)",
    getDropTableCmdSql(tableMapping)
  );

  appConsole.log(
    "getDropTableCmdSql(tableMapping, true)",
    getDropTableCmdSql(tableMapping, true)
  );

  const logSchema = async (
    tranDb: Sqlite3TransactionDatabase,
    db: Sqlite3Database,
    msg: string
  ) => {
    appConsole.log(
      `tranDb sqlite_schema ${msg}`,
      await tranDb.all("SELECT name FROM sqlite_schema", {})
    );

    appConsole.log(
      `db sqlite_schema ${msg}`,
      await db.all("SELECT name FROM sqlite_schema", {})
    );
  };

  await dbMetadataTable.sqlite3Db.executeWithTranDbThreadSafe(
    async (tranDb, db) => {
      await logSchema(tranDb, db, "START");

      await dbMetadataTable.dropIfExists(tranDb);
      await logSchema(tranDb, db, "DROPPED");

      await dbMetadataTable.create(tranDb);
      await logSchema(tranDb, db, "CREATED");

      await dbMetadataTable.createIfNotExists(tranDb);
      await logSchema(tranDb, db, "CREATED");

      await dbMetadataTable.drop(tranDb);
      await logSchema(tranDb, db, "DROPPED");

      await dbMetadataTable.dropIfExists(tranDb);
      await logSchema(tranDb, db, "DROPPED");

      await tranDb.commit();
    }
  );
};

await runTest1();
