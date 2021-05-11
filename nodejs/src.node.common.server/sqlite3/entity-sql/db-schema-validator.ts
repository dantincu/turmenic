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

import { Sqlite3EntityDbOpts, Sqlite3EntityDbBase } from "./entity-db.js";

export interface DbSchema {
  type: string;
  name: string;
  tbl_name: string;
  sql: string;
  rootpage?: number | null | undefined;
}

export class DbSchemaValidator extends Sqlite3EntityDbBase<Sqlite3EntityDbOpts> {
  constructor(opts: Sqlite3EntityDbOpts) {
    super(opts);
  }

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
    } else {
      appConsole.log(
        `Db schema is valid for db file path ${this.dbDataFilePath}`
      );
    }
  }

  public async dumpDbSchema() {
    const dbSchema = await this.loadSchemaFromDb();

    await makeDirSafeUpdate({
      parentDirPath: path.dirname(this.dbSchemaDirPath),
      entryName: path.basename(this.dbSchemaDirPath),
      assureParentDirPath: true,
      updateFunc: async (dbSchemaDirPath) => {
        await forEachAsync(dbSchema, async (dbSchemaObj) => {
          const filePath = this.geDbSchemaObjFilePath(
            dbSchemaObj,
            dbSchemaDirPath
          );

          await writeFileAsync(filePath, dbSchemaObj.sql);
        });

        return true;
      },
    });
  }

  getDbSchemaObjFileName(schemaObj: DbSchema) {
    const fileName = `schema.${schemaObj.type}.${schemaObj.name}.${schemaObj.tbl_name}.sql`;
    return fileName;
  }

  geDbSchemaObjFilePath(
    schemaObj: DbSchema,
    dbSchemaDirPath?: string | null | undefined
  ) {
    dbSchemaDirPath = dbSchemaDirPath ?? this.dbSchemaDirPath;

    const fileName = this.getDbSchemaObjFileName(schemaObj);
    const filePath = normJoinPath([dbSchemaDirPath, fileName]);

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
    const fileNameParts = fileName.split(".");

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
