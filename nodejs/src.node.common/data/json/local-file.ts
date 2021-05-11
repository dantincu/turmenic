import path from "path";

import {
  EnvConfig,
  envBaseDir,
} from "../../../src.node.common/appSettings/envConfig.js";

import { maxDate } from "../../../src.common/utils/date.js";

import {
  DataCollectionBase,
  DataCollectionOptions,
  JsonDataCollection,
  JsonDataContainer,
  DataSaveErrorType,
  DataSourceMetadata,
  DataSaveResult,
} from "./data-collection.js";

import {
  DataSourceOptions,
  DataSourceBase,
  DataSourceSaveResult,
} from "./data-source.js";

import {
  getFileLastModifiedTime,
  createDirIfNotExisting,
  removeDirWithContentAsync,
} from "../../fileSystem/fileSystem.js";

import {
  mkdirAsync,
  copyAsync,
  emptyDirAsync,
  rmAsync,
  renameAsync,
} from "../../fileSystem/types.js";

import {
  loadJsonFromFileAsync,
  saveJsonToFileAsync,
  loadJsonFromFileOrDefault,
} from "../../fileSystem/json.js";

import { DataSourceInfo, VersionedDataSourceInfo } from "./data-source.js";

export const dataSourceDirNames = Object.freeze({
  current: "current",
  prev: "prev",
  next: "next",
});

export const dataSourceFileNames = Object.freeze({
  bckp: "bckp",
});

export class LocalFileDataSourceOptions<
  TMetadataCollection extends DataCollectionBase<
    DataSourceMetadata,
    DataSourceMetadata
  >
> extends DataSourceOptions<TMetadataCollection> {
  dataSourceDirRelPath: string;

  constructor(
    envConfig: EnvConfig,
    dataSourceName: string,
    metadataCollection: TMetadataCollection,
    dataSourceDirRelPath: string
  ) {
    super(envConfig, dataSourceName, metadataCollection);
    this.dataSourceDirRelPath = dataSourceDirRelPath;
  }
}

export abstract class LocalFileDataSourceBase<
  TMetadataCollection extends DataCollectionBase<
    DataSourceMetadata,
    DataSourceMetadata
  >
> extends DataSourceBase<TMetadataCollection> {
  dataSourceDirRelPath: string;

  constructor(opts: LocalFileDataSourceOptions<TMetadataCollection>) {
    super(opts);
    this.dataSourceDirRelPath = opts.dataSourceDirRelPath;
  }
}

export abstract class LocalFileCollectionBase<
  TData,
  TJsonData
> extends DataCollectionBase<TData, TJsonData> {
  readonly dataJsonFilePath: string;
  readonly dataDirRelPath: string;
  readonly dataDirBasePath: string;

  constructor(opts: DataCollectionOptions<TData, TJsonData>) {
    super(opts);
    this.dataDirRelPath = this.getDataDirRelPath();
    this.dataDirBasePath = this.getDataDirBasePath();

    this.dataJsonFilePath = this.getDataJsonFilePath(opts.collectionName);
  }

  abstract getDataDirRelPath(): string;

  async loadJsonData(): Promise<JsonDataContainer<TJsonData>> {
    const lastModifiedTime = await getFileLastModifiedTime(
      this.dataJsonFilePath
    );

    const jsonData: JsonDataContainer<TJsonData> = await loadJsonFromFileOrDefault(
      this.dataJsonFilePath,
      <JsonDataContainer<TJsonData>>{
        collection: <JsonDataCollection<TJsonData>>{
          dataItems: [],
        },
        lastModifiedTime: lastModifiedTime,
      }
    );

    jsonData.lastModifiedTime = maxDate(
      jsonData.lastModifiedTime,
      lastModifiedTime
    );

    return jsonData;
  }

  async saveJsonData(
    jsonData: JsonDataContainer<TJsonData>,
    safeMode?: boolean
  ): Promise<DataSaveResult<TData, TJsonData>> {
    const currentLastModifiedTime = await this.getConflictingLastModifiedTime();
    let newLastModifiedTime = currentLastModifiedTime;

    if (currentLastModifiedTime.getTime() === 0) {
      await this.saveJsonDataToFile(jsonData, safeMode);

      newLastModifiedTime = await getFileLastModifiedTime(
        this.dataJsonFilePath
      );
    }

    const dataSaveResultRaw = <DataSaveResult<TData, TJsonData>>{
      success: true,
      newLastModifiedTime: newLastModifiedTime,
      jsonDataList: jsonData.collection.dataItems,
      errorType: DataSaveErrorType.None,
    };

    if (currentLastModifiedTime.getTime() > 0) {
      dataSaveResultRaw.success = false;
      dataSaveResultRaw.errorType = DataSaveErrorType.FileConflict;

      dataSaveResultRaw.errorMessage =
        "The current json file contains changes that have not yet been synced";
    }

    return dataSaveResultRaw;
  }

  async saveJsonDataToFile(
    jsonData: JsonDataContainer<TJsonData>,
    safeMode?: boolean
  ) {
    if (safeMode) {
      const currentDataDirPath = this.getDataJsonDirPath(
        dataSourceDirNames.current
      );

      const prevDataDirPath = this.getDataJsonDirPath(dataSourceDirNames.prev);

      await this.saveJsonToFile(jsonData, dataSourceDirNames.next);
      await this.copyJsonDataFiles(currentDataDirPath, prevDataDirPath);
    } else {
      const fileName = this.getDataJsonFilePath(this.collectionName);

      const backupFileName = this.getDataJsonFilePath(
        this.collectionName,
        dataSourceDirNames.current,
        dataSourceFileNames.bckp
      );

      await this.saveJsonToFile(
        jsonData,
        dataSourceDirNames.current,
        dataSourceFileNames.bckp
      );

      await rmAsync(fileName);

      try {
        await renameAsync(backupFileName, fileName);
      } catch (err) {}
    }
  }

  async copyJsonDataFiles(srcDirPath: string, destDirPath: string) {
    await copyAsync(srcDirPath, destDirPath, {
      recursive: true,
      preserveTimestamps: true,
    });
  }

  async saveJsonToFile(
    jsonData: JsonDataContainer<TJsonData>,
    dataDirName?: string | null,
    fileNameSuffix?: string | null
  ): Promise<void> {
    dataDirName = dataDirName ?? dataSourceDirNames.current;

    const dataJsonFilePath = this.getDataJsonFilePath(
      this.collectionName,
      dataDirName,
      fileNameSuffix
    );

    saveJsonToFileAsync(jsonData, dataJsonFilePath);
  }

  async onBeginDataAccess(
    write: boolean,
    safeMode?: boolean | null | undefined
  ): Promise<void> {
    await super.onBeginDataAccess(write, safeMode);

    await createDirIfNotExisting(this.dataDirBasePath);
    const dirPath = this.getDataJsonDirPath();
    await createDirIfNotExisting(dirPath);
  }

  getDataJsonFilePath(
    collectionName: string,
    dataDirName?: string | null,
    fileNameSuffix?: string | null
  ): string {
    dataDirName = dataDirName ?? dataSourceDirNames.current;

    const dirPath = this.getDataJsonDirPath(dataDirName);
    const fileName = this.getDataJsonFileName(collectionName, fileNameSuffix);

    const filePath = path.join(dirPath, fileName);
    return filePath;
  }

  getDataJsonDirPath(dataDirName = dataSourceDirNames.current) {
    const dirPath = path.join(this.dataDirBasePath, dataDirName);
    return dirPath;
  }

  getDataDirBasePath() {
    const dirPath = this.envConfig.getEnvRelPath(
      envBaseDir.data,
      this.dataDirRelPath
    );

    return dirPath;
  }

  getDataJsonFileName(
    dataCollectionName: string,
    fileNameSuffix?: string | null
  ): string {
    const dataFileNameParts = [dataCollectionName];

    if (fileNameSuffix) {
      dataFileNameParts.push(fileNameSuffix);
    }

    dataFileNameParts.push("json");
    const dataFileName = dataFileNameParts.join(".");

    return dataFileName;
  }

  async getConflictingLastModifiedTime(): Promise<Date> {
    const lastModifiedTime = this.lastModifiedTime ?? new Date(0);
    const mtime = await getFileLastModifiedTime(this.dataJsonFilePath);

    const isConflict = mtime > lastModifiedTime;

    const retVal: Date = isConflict ? mtime : new Date(0);
    return retVal;
  }
}

export abstract class MetadataLocalFileCollectionBase extends LocalFileCollectionBase<
  DataSourceMetadata,
  DataSourceMetadata
> {
  constructor(
    opts: DataCollectionOptions<DataSourceMetadata, DataSourceMetadata>
  ) {
    super(opts);
    this.dataSaveOptions = {};
  }

  static readonly COLLECTION_NAME = "metadata";

  public async beforeSavePrep(safeMode?: boolean): Promise<boolean> {
    if (safeMode) {
      const prevDataDirPath = this.getDataJsonDirPath(dataSourceDirNames.prev);
      const nextDataDirPath = this.getDataJsonDirPath(dataSourceDirNames.next);

      await mkdirAsync(nextDataDirPath);
      await mkdirAsync(prevDataDirPath);
    }

    return true;
  }

  public async afterSaveCleanup(safeMode?: boolean): Promise<boolean> {
    if (safeMode) {
      const currentDataDirPath = this.getDataJsonDirPath(
        dataSourceDirNames.current
      );

      const prevDataDirPath = this.getDataJsonDirPath(dataSourceDirNames.prev);
      const nextDataDirPath = this.getDataJsonDirPath(dataSourceDirNames.next);

      await removeDirWithContentAsync(currentDataDirPath);
      await renameAsync(nextDataDirPath, currentDataDirPath);
      await removeDirWithContentAsync(prevDataDirPath);
    }

    return true;
  }
}

export interface LocalFileDataSourceInfo extends DataSourceInfo {
  dataSourceDirRelPath: string;
}

export interface VersionedLocalFileDataSourceInfo
  extends LocalFileDataSourceInfo,
    VersionedDataSourceInfo {}
