import { nameof, NameofOptions } from "ts-simple-nameof";
import path from "path";

import { forEachAsync } from "../../../src.common/arrays/arrays-async.js";
import { arraysAreEqual } from "../../../src.common/arrays/arr-diff.js";

import { normJoinPath } from "../../../src.node.common/fileSystem/path.js";
import { createDirPathRec } from "../../../src.node.common/fileSystem/dir-hierarchy.js";

import {
  readdirAsync,
  readFileAsync,
  writeFileAsync,
} from "../../../src.node.common/fileSystem/types.js";

import {
  SafeUpdateOpts,
  TempEntryNameOpts,
} from "../../../src.node.common/fileSystem/safe-update/safe-update.base.js";
import { makeDirSafeUpdate } from "../../../src.node.common/fileSystem/safe-update/dir-safe-update.js";

import {
  envConfig,
  envBaseDir,
  EnvConfig,
} from "../../../src.node.common/appSettings/envConfig.js";

import { GenericHash } from "../../../src.common/utils/types.js";
import {
  EntityBase,
  EntityMapping,
  EntityMappingBase,
  EntityPropMapping,
} from "./entity.base.js";

import {
  ColumnDbType,
  DataTypeConvertor,
  PropJsType,
  DateTime,
  PropCustomType,
  Sqlite3DbError,
  getSqlite3DbError,
} from "./db-types.js";

import {
  assureJsValOfType,
  isDbNull,
  assureJsValIsBit,
  assureJsValIsInt,
  assurePropValid,
  getDataTypeConvertor,
  assureJsValIsPositiveNumber,
  convertJsValue,
} from "./db-types-validators.js";

import { Sqlite3Db } from "../sqlite3-db.js";
import { Sqlite3Database } from "../sqlite3-database.js";
import { appConsole } from "../../../src.common/logging/appConsole.js";

import { Sqlite3EntityDbOpts, Sqlite3EntityDbBase } from "./entity-db.js";

export interface Sqlite3DbTableOpts<TData> extends Sqlite3EntityDbOpts {
  tableMapping: EntityMappingBase<TData>;
}

export const getTableColumnSqlDef = (propMapping: EntityPropMapping) => {
  const sql = `${propMapping.columnName} ${propMapping.columnDbType}`;
  return sql;
};

export const getTableColumnsListSqlDef = <TData>(
  tableMapping: EntityMappingBase<TData>
) => {
  const sql = Object.values(tableMapping.propMappings)
    .map((propMapping) => getTableColumnSqlDef(propMapping))
    .join(",\n");

  return sql;
};

export const getCreateTableCmdSql = <TData>(
  tableMapping: EntityMappingBase<TData>,
  ifNotExists?: boolean | null | undefined
) => {
  const tableColumnsListSqlDef = getTableColumnsListSqlDef(tableMapping);
  let commandSql = `CREATE TABLE`;

  if (ifNotExists) {
    commandSql = `${commandSql} IF NOT EXISTS`;
  }

  const sql = `${commandSql} ${tableMapping.tableName} (${tableColumnsListSqlDef})`;
  return sql;
};

export const getDropTableCmdSql = <TData>(
  tableMapping: EntityMappingBase<TData>,
  ifExists?: boolean | null | undefined
) => {
  let commandSql = `DROP TABLE`;

  if (ifExists) {
    commandSql = `${commandSql} IF EXISTS`;
  }

  const sql = `${commandSql} ${tableMapping.tableName}`;
  return sql;
};

export interface IDbTable {
  create(db: Sqlite3Database): Promise<void>;
  drop(db: Sqlite3Database): Promise<void>;
  createIfNotExists(db: Sqlite3Database): Promise<void>;
  dropIfExists(db: Sqlite3Database): Promise<void>;
  getTableName(): string;
}

export class DbTableBase<TData>
  extends Sqlite3EntityDbBase<Sqlite3DbTableOpts<TData>>
  implements IDbTable {
  tableMapping: EntityMappingBase<TData>;

  constructor(opts: Sqlite3DbTableOpts<TData>) {
    super(opts);
    this.tableMapping = opts.tableMapping;
  }

  public getTableName() {
    const tableName = this.tableMapping.tableName;
    return tableName;
  }

  public async create(db: Sqlite3Database) {
    const sql = getCreateTableCmdSql(this.tableMapping);
    await db.run(sql, {});
  }

  public async drop(db: Sqlite3Database) {
    const sql = getDropTableCmdSql(this.tableMapping);
    await db.run(sql, {});
  }

  public async createIfNotExists(db: Sqlite3Database) {
    const sql = getCreateTableCmdSql(this.tableMapping, true);
    await db.run(sql, {});
  }

  public async dropIfExists(db: Sqlite3Database) {
    const sql = getDropTableCmdSql(this.tableMapping, true);
    await db.run(sql, {});
  }
}
