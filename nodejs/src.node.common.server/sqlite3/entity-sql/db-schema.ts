import { nameof, NameofOptions } from "ts-simple-nameof";
import path from "path";

import { forEachAsync } from "../../../src.common/arrays/arrays-async.js";
import { arraysAreEqual } from "../../../src.common/arrays/arr-diff.js";

import { normJoinPath } from "../../../src.node.common/fileSystem/path.js";
import {
  readdirAsync,
  readFileAsync,
} from "../../../src.node.common/fileSystem/types.js";
import { createDirPathRec } from "../../../src.node.common/fileSystem/dir-hierarchy";

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

export interface DbSchema {
  type: string;
  name: string;
  tbl_name: string;
  sql: string;
  rootpage?: number | null | undefined;
}

export class DbSchemaExtractor {
  envConfig: EnvConfig;

  dbBaseDirPath: string;
  dbDataDirPath: string;
  dbDataFilePath: string;
  dbSchemaDirPath: string;

  sqlite3Db: Sqlite3Db;

  constructor(envConfig: EnvConfig) {
    this.envConfig = envConfig;

    this.dbBaseDirPath = envConfig.getEnvRelPath(
      envBaseDir.data,
      this.dbBaseRelDirPath
    );

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

    this.sqlite3Db = new Sqlite3Db(this.dbDataFilePath);
  }

  public static readonly DEFAULT_DB_BASE_REL_DIR_PATH = "sqlite3";
  public static readonly DEFAULT_DB_DATA_REL_DIR_PATH = "data";
  public static readonly DEFAULT_DB_SCHEMA_REL_DIR_PATH = "schema";
  public static readonly DEFAULT_DB_DATA_FILE_NAME = "sqlite3-data.db";

  public async isDbSchemaValid() {
    const fsSchema = await this.loadSchemaFromDir();
    const dbSchema = await this.loadSchemaFromDb();

    const retVal = arraysAreEqual(fsSchema, dbSchema);
    return retVal;
  }

  public async assureDbSchemaIsValid() {
    if (!(await this.isDbSchemaValid())) {
      throw new Error(
        `Db schema is invalid for db file path ${this.dbDataFilePath}`
      );
    }
  }

  public async dumpDbSchema() {
    const dbSchema = await this.loadSchemaFromDb();

    await forEachAsync(dbSchema, async (dbSchemaObj) => {
        
    });
  }

  get dbBaseRelDirPath() {
    return DbSchemaExtractor.DEFAULT_DB_BASE_REL_DIR_PATH;
  }

  get dbDataRelDirPath() {
    return DbSchemaExtractor.DEFAULT_DB_DATA_REL_DIR_PATH;
  }

  get dbDataFileName() {
    return DbSchemaExtractor.DEFAULT_DB_DATA_FILE_NAME;
  }

  get dbSchemaRelDirPath() {
    return DbSchemaExtractor.DEFAULT_DB_SCHEMA_REL_DIR_PATH;
  }

  getDbSchemaObjFileName(schemaObj: DbSchema) {
    const fileName = `schema.${schemaObj.type}.${schemaObj.name}.${schemaObj.tbl_name}.sql`;
    return fileName;
  }

  geDbSchemaObjFilePath(schemaObj: DbSchema) {
    const fileName = this.getDbSchemaObjFileName(schemaObj);
    const filePath = normJoinPath([this.dbSchemaDirPath, fileName]);

    return filePath;
  }

  async loadSchemaFromDb() {
    await createDirPathRec(this.dbDataDirPath);
    let dbSchemaObjArr: DbSchema[] = [];

    await this.sqlite3Db.executeWithDbThreadSafe(async (db) => {
      dbSchemaObjArr = await db.all(
        "SELECT type, name, tbl_name, sql FROM sqlite_schema",
        {}
      );
    });

    return dbSchemaObjArr;
  }

  async loadSchemaFromDir() {
    await createDirPathRec(this.dbSchemaDirPath);
    const fileNames = await readdirAsync(this.dbSchemaDirPath);

    const dbSchemaObjArr = await this.loadSchemaFromFiles(fileNames);
    return dbSchemaObjArr;
  }

  async loadSchemaFromFiles(fileNames: string[]) {
    const dbSchemaObjArr: DbSchema[] = [];

    await forEachAsync(fileNames, async (fileName) => {
      await this.loadSchemaObj(dbSchemaObjArr, fileName);
    });

    return dbSchemaObjArr;
  }

  async loadSchemaObj(dbSchemaObjArr: DbSchema[], fileName: string) {
    const fileNameParts = fileName.split(/\\\//g);

    if (this.isDbSchemaFileName(fileNameParts)) {
      dbSchemaObjArr.push(await this.getDbSchemaObj(fileName, fileNameParts));
    }
  }

  async getDbSchemaObj(fileName: string, fileNameParts: string[]) {
    const dbSchemaObj = {
      type: fileNameParts[1],
      name: fileNameParts[2],
      tbl_name: fileNameParts[3],
      sql: (
        await readFileAsync(normJoinPath([this.dbSchemaDirPath, fileName]))
      ).toString("utf8"),
    };

    return dbSchemaObj;
  }

  isDbSchemaFileName(fileNameParts: string[]) {
    let retVal = fileNameParts.length === 5;

    retVal = retVal && fileNameParts[0] === "schema";
    retVal = retVal && fileNameParts[4] === "sql";

    return retVal;
  }
}
