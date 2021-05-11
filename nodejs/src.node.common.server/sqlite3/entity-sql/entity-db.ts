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
import { EntityBase, EntityMapping, EntityMappingBase } from "./entity.base.js";

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
import { appConsole } from "../../../src.common/logging/appConsole.js";

export interface Sqlite3EntityDbOpts {
  dbBaseDirPath: string;
  sqlite3Db?: Sqlite3Db | null | undefined;
}

export class Sqlite3EntityDbBase<TOpts extends Sqlite3EntityDbOpts> {
  opts: TOpts;

  dbBaseDirPath: string;
  dbDataDirPath: string;
  dbDataFilePath: string;
  dbSchemaDirPath: string;

  sqlite3Db: Sqlite3Db;

  constructor(opts: TOpts) {
    this.opts = opts;
    this.dbBaseDirPath = opts.dbBaseDirPath;

    /* this.dbBaseDirPath = appEnv.getEnvRelPath(
      envBaseDir.data,
      this.dbBaseRelDirPath
    ); */

    this.dbDataDirPath = normJoinPath([
      this.dbBaseDirPath,
      this.dbDataRelDirPath,
    ]);

    this.dbDataFilePath = normJoinPath([
      this.dbDataDirPath,
      this.dbDataFileName,
    ]);

    this.dbSchemaDirPath = normJoinPath([
      this.dbBaseDirPath,
      this.dbSchemaRelDirPath,
    ]);

    this.sqlite3Db = opts.sqlite3Db ?? new Sqlite3Db(this.dbDataFilePath);
    opts.sqlite3Db = opts.sqlite3Db ?? this.sqlite3Db;
  }

  // public static readonly DEFAULT_DB_BASE_REL_DIR_PATH = "sqlite3";
  public static readonly DEFAULT_DB_DATA_REL_DIR_PATH = "data";
  public static readonly DEFAULT_DB_SCHEMA_REL_DIR_PATH = "schema";
  public static readonly DEFAULT_DB_DATA_FILE_NAME = "sqlite3-data.db";

  /* get dbBaseRelDirPath() {
    return DbSchemaValidator.DEFAULT_DB_BASE_REL_DIR_PATH;
  } */

  get dbDataRelDirPath() {
    return Sqlite3EntityDbBase.DEFAULT_DB_DATA_REL_DIR_PATH;
  }

  get dbDataFileName() {
    return Sqlite3EntityDbBase.DEFAULT_DB_DATA_FILE_NAME;
  }

  get dbSchemaRelDirPath() {
    return Sqlite3EntityDbBase.DEFAULT_DB_SCHEMA_REL_DIR_PATH;
  }
}
