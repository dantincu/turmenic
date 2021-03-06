import {
  EnvConfig,
  envBaseDir,
} from "../../../src.common/appSettings/envConfig.js";

import {
  DataCollectionBase,
  DataCollectionOptions,
  JsonDataCollection,
  JsonDataContainer,
  DataSaveResultRaw,
  DataSaveErrorType,
  DataSourceOptions,
  DataSourceBase,
  DataSourceMetadata
} from "./data-collection.js";

import {
  getFileLastModifiedTime,
  createDirIfNotExisting,
} from "../../fileSystem/index.js";

import {
  loadJsonFromFileAsync,
  saveJsonToFileAsync,
  loadJsonFromFileOrDefault,
} from "../../fileSystem/json.js";

export class LocalFileDataSourceOptions extends DataSourceOptions {
  dataSourceDirRelPath: string;

  constructor(
    envConfig: EnvConfig,
    dataSourceName: string,
    dataSourceDirRelPath: string
  ) {
    super(envConfig, dataSourceName);

    this.dataSourceDirRelPath = dataSourceDirRelPath;
  }
}

export abstract class LocalFileDataSourceBase extends DataSourceBase {
  dataSourceDirRelPath: string;

  constructor(opts: LocalFileDataSourceOptions) {
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

  constructor(opts: DataCollectionOptions<TData, TJsonData>) {
    super(opts);
    this.dataDirRelPath = this.getDataDirRelPath();
    this.dataJsonFilePath = this.getDataJsonFilePath(opts.collectionName);
  }

  abstract getDataDirRelPath(): string;

  public async loadJsonData(): Promise<JsonDataContainer<TJsonData>> {
    const lastModifiedTime = await this.getCurrentLastModifiedTime();

    const jsonData: JsonDataContainer<TJsonData> = await loadJsonFromFileOrDefault(
      this.dataJsonFilePath,
      <JsonDataContainer<TJsonData>>{
        collection: <JsonDataCollection<TJsonData>>{
          dataItems: [],
        },
        lastModifiedTime: lastModifiedTime,
      }
    );

    return jsonData;
  }

  public async saveJsonData(
    jsonData: JsonDataContainer<TJsonData>
  ): Promise<DataSaveResultRaw<TData, TJsonData>> {
    const currentLastModifiedTime = await this.getCurrentLastModifiedTime();
    let newLastModifiedTime = currentLastModifiedTime;

    if (currentLastModifiedTime.getTime() === 0) {
      await saveJsonToFileAsync(jsonData, this.dataJsonFilePath);
      newLastModifiedTime = await this.getCurrentLastModifiedTime();
    }

    const dataSaveResultRaw = <DataSaveResultRaw<TData, TJsonData>>{
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

  async onDataAccess(): Promise<void> {
    await createDirIfNotExisting(this.dataDirRelPath);
  }

  getDataJsonFilePath(collectionName: string): string {
    const fileName = this.getDataJsonFileName(collectionName);

    const filePath = this.envConfig.getEnvRelPath(
      envBaseDir.data,
      this.dataDirRelPath,
      fileName
    );

    return filePath;
  }

  getDataJsonFileName(collectionName: string): string {
    const dataFileName = `${collectionName}.json`;
    return dataFileName;
  }

  async getCurrentLastModifiedTime(): Promise<Date> {
    const lastModifiedTime = this.lastModifiedTime ?? new Date(0);
    const mtime = await getFileLastModifiedTime(this.dataJsonFilePath);

    const isConflicting = mtime > lastModifiedTime;

    const retVal: Date = isConflicting ? mtime : new Date(0);
    return retVal;
  }
}

export abstract class MetadataLocalFileCollectionBase extends LocalFileCollectionBase<
  DataSourceMetadata,
  DataSourceMetadata
> {}
