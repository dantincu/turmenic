import slug from "slug";

import {
  EnvConfig,
  envBaseDir,
} from "../../../src.node.common/appSettings/envConfig.js";

/*
import {
  executeLockingAsync,
  getValueLockingAsync,
  executeLocking,
  getValueLocking,
} from "../../async/redis-mutex.js"; */

import { uStrId } from "../uStrId.js";
import { clone, copyShallow } from "../../../src.common/utils/types.js";
import { compareVersions } from "../../../src.common/text/pckg.js";

export const BLANK_VERSION_VALUE = "0.0.0";

export interface DataSaveOptions<TData, TJsonData> {
  uuidPropName?: string;
  keyPropName?: string;
  keyGenerator?: (dataItem: TData) => string;
}

export enum DataSaveErrorType {
  None = 0,
  FileConflict = 1,
  Unknown = 2,
}

export interface DataSaveResultBase<TData, TJsonData> {
  success: boolean;
  errorMessage?: string;
  errorType: DataSaveErrorType;
  newLastModifiedTime: Date;
}

export interface DataSaveResultRaw<TData, TJsonData>
  extends DataSaveResultBase<TData, TJsonData> {
  jsonDataList: TJsonData[];
}

export interface DataSaveResult<TData, TJsonData>
  extends DataSaveResultBase<TData, TJsonData> {
  dataList: TData[];
}

export enum DataSourceUpdateErrorType {
  None = 0,
  CorruptedData = 1,
  Unknown = 2,
}

export interface DataSourceUpdateResult {
  success: boolean;
  isUpToDate: boolean;
  errorMessage?: string;
  errorType: DataSourceUpdateErrorType;
}

export class DataCollectionOptions<TData, TJsonData> {
  envConfig: EnvConfig;
  dataSourceName: string;
  collectionName: string;
  dataSaveOptions?: DataSaveOptions<TData, TJsonData>;

  constructor(
    envConfig: EnvConfig,
    dataSourceName: string,
    collectionName: string
  ) {
    this.envConfig = envConfig;
    this.dataSourceName = dataSourceName;
    this.collectionName = collectionName;
  }
}

export class DataSourceOptions {
  envConfig: EnvConfig;
  dataSourceName: string;

  constructor(envConfig: EnvConfig, dataSourceName: string) {
    this.envConfig = envConfig;
    this.dataSourceName = dataSourceName;
  }
}

export abstract class DataSourceBase {
  readonly envConfig: EnvConfig;
  readonly dataSourceName: string;

  constructor(opts: DataSourceOptions) {
    this.envConfig = opts.envConfig;
    this.dataSourceName = opts.dataSourceName;
  }
}

export interface JsonDataCollection<TJsonData> {
  dataItems: TJsonData[];
}

export interface JsonDataContainer<TJsonData> {
  collection: JsonDataCollection<TJsonData>;
  lastModifiedTime: Date;
}

export abstract class DataCollectionBase<TData, TJsonData> {
  readonly envConfig: EnvConfig;
  readonly dataSourceName: string;
  readonly collectionName: string;
  readonly dataSaveOptions: DataSaveOptions<TData, TJsonData>;
  readonly syncLockName: string;
  lastModifiedTime?: Date;

  constructor(opts: DataCollectionOptions<TData, TJsonData>) {
    this.envConfig = opts.envConfig;
    this.dataSourceName = opts.dataSourceName;
    this.collectionName = opts.collectionName;
    this.dataSaveOptions = opts.dataSaveOptions ?? this.getDefaultSaveOptions();
    this.syncLockName = this.getSyncLockName();
  }

  public abstract loadJsonData(): Promise<JsonDataContainer<TJsonData>>;
  public abstract saveJsonData(
    jsonData: JsonDataContainer<TJsonData>
  ): Promise<DataSaveResultRaw<TData, TJsonData>>;

  public async fetch(): Promise<TData[]> {
    /* const jsonData: JsonDataContainer<TJsonData> = await getValueLockingAsync(
      this.syncLockName,
      async () => {
        await this.onDataAccess();
        const jsonData = await this.loadJsonData();
        this.lastModifiedTime = jsonData.lastModifiedTime;

        return jsonData;
      }
    );*/

    await this.onDataAccess();
    const jsonData = await this.loadJsonData();
    this.lastModifiedTime = jsonData.lastModifiedTime;

    const dataItems = this.getDataForFetch(jsonData);
    return dataItems;
  }

  public async save(
    dataList: TData[]
  ): Promise<DataSaveResult<TData, TJsonData>> {
    const jsonData = this.getJsonDataForSave(dataList);

    /* const dataSaveResultRaw = await getValueLockingAsync(
      this.syncLockName,
      async () => {
        await this.onDataAccess();
        const dataSaveResultRaw = await this.saveJsonData(jsonData);
        return dataSaveResultRaw;
      }
    ); */

    await this.onDataAccess();
    const dataSaveResultRaw = await this.saveJsonData(jsonData);

    const dataSaveResult = <DataSaveResult<TData, TJsonData>>(
      (<unknown>dataSaveResultRaw)
    );

    dataSaveResult.dataList = this.getDataForFetch(jsonData);
    return dataSaveResult;
  }

  async onDataAccess(): Promise<void> {}

  getDefaultSaveOptions(): DataSaveOptions<TData, TJsonData> {
    const dataSaveOptions = <DataSaveOptions<TData, TJsonData>>{
      uuidPropName: "uuid",
      keyPropName: "key",
      keyGenerator: this.generateKey.bind(this),
    };

    return dataSaveOptions;
  }

  getJsonDataForSave(dataList: TData[]): JsonDataContainer<TJsonData> {
    const jsonDataList = dataList.map((dataItem) =>
      this.getDataItemForSave(dataItem, dataList)
    );

    const jsonData = <JsonDataCollection<TJsonData>>{
      dataItems: jsonDataList,
    };

    const jsonDataContainer = <JsonDataContainer<TJsonData>>{
      collection: jsonData,
      lastModifiedTime: new Date(),
    };

    return jsonDataContainer;
  }

  getDataForFetch(jsonData: JsonDataContainer<TJsonData>): TData[] {
    const dataList = jsonData.collection.dataItems.map((value) =>
      this.getDataItemForFetch(value)
    );

    return dataList;
  }

  getDataItemForSave(dataItem: TData, dataList: TData[]): TJsonData {
    const clonedDataItem = clone(dataItem);

    this.assureDataItemHasUuid(dataItem);
    this.assureDataItemHasUniqueKey(clonedDataItem, dataItem, dataList);

    const jsonData = copyShallow<TJsonData, TData>(<TJsonData>{}, dataItem);
    return jsonData;
  }

  getDataItemForFetch(jsonDataItem: TJsonData): TData {
    const dataItem = copyShallow<TData, TJsonData>(<TData>{}, jsonDataItem);
    return dataItem;
  }

  assureDataItemHasUuid(dataItem: TData) {
    if (this.dataSaveOptions.uuidPropName) {
      if (!dataItem[<keyof TData>this.dataSaveOptions.uuidPropName]) {
        dataItem[<keyof TData>this.dataSaveOptions.uuidPropName] = <
          TData[keyof TData]
        >(<unknown>this.generateUuid());
      }
    }
  }

  assureDataItemHasUniqueKey(
    clonedDataItem: TData,
    dataItem: TData,
    dataList: TData[]
  ) {
    if (this.dataSaveOptions.keyPropName) {
      if (!clonedDataItem[<keyof TData>this.dataSaveOptions.keyPropName]) {
        clonedDataItem[<keyof TData>this.dataSaveOptions.keyPropName] = <
          TData[keyof TData]
        >(<unknown>this.generateUniqueKey(clonedDataItem, dataList));
      } else {
        this.assureKeyUnique(clonedDataItem, dataItem, dataList);
      }
    }
  }

  generateUuid(): string {
    const uuid = uStrId();
    return uuid;
  }

  generateKey(item: TData) {
    const itemName: string | null = (<any>item).name;

    const key = itemName ? slug(itemName) : null;
    return key;
  }

  generateUniqueKey(dataItem: TData, dataList: TData[]) {
    let keySlug = this.dataSaveOptions.keyGenerator?.call(this, dataItem);
    let suffix = 0;
    let key = keySlug;

    if (key) {
      while (
        dataList.find(
          (item) =>
            <string>(
              (<unknown>item[<keyof TData>this.dataSaveOptions.uuidPropName])
            ) === keySlug
        )
      ) {
        key = `${keySlug}_${suffix}`;
      }
    }

    return key;
  }

  assureKeyUnique(clonedDataItem: TData, dataItem: TData, dataList: TData[]) {
    if (this.isKeyUnique(clonedDataItem, dataItem, dataList) !== true) {
      throw new Error(
        `Duplicate key found: key prop name: ${
          this.dataSaveOptions.keyPropName
        }; key prop value: ${
          dataItem[<keyof TData>this.dataSaveOptions.keyPropName]
        }`
      );
    }
  }

  isKeyUnique(clonedDataItem: TData, dataItem: TData, dataList: TData[]) {
    const collidingItem = dataList.find(
      (item) =>
        item !== dataItem &&
        item[<keyof TData>this.dataSaveOptions.keyPropName] ===
          clonedDataItem[<keyof TData>this.dataSaveOptions.keyPropName]
    );

    const isUnique = !collidingItem;
    return isUnique;
  }

  getSyncLockName(): string {
    const syncLockName = `${this.dataSourceName}::${this.collectionName}`;
    return syncLockName;
  }
}

export interface DataSourceMetadata {
  dataSourceVersion: string;
}

export abstract class MetadataCollectionBase extends DataCollectionBase<
  DataSourceMetadata,
  DataSourceMetadata
> {
  constructor(
    opts: DataCollectionOptions<DataSourceMetadata, DataSourceMetadata>
  ) {
    super(opts);
  }
}

export const assureUpToDate = async (
  metadataCollection: DataCollectionBase<
    DataSourceMetadata,
    DataSourceMetadata
  >,
  reqVersion: string,
  err?: Error
) => {
  const updateResult = await IsUpToDate(metadataCollection, reqVersion);

  if (!updateResult.success || updateResult.isUpToDate !== true) {
    err = err ?? new Error(updateResult.errorMessage);
    throw err;
  }
};

export const IsUpToDate = async (
  metadataCollection: DataCollectionBase<
    DataSourceMetadata,
    DataSourceMetadata
  >,
  reqVersion: string
): Promise<DataSourceUpdateResult> => {
  const metadataList = await metadataCollection.fetch();
  let dataCorrupted = metadataList.length > 1;
  let corruptedDataErrorMessage = "the loaded data is ambiguous";
  let versionComparisonResult = 0;
  let isUpToDate = false;
  const metadata = metadataList.pop() ?? null;

  if (!dataCorrupted) {
    if (metadata) {
      const currentVersion = metadata?.dataSourceVersion ?? BLANK_VERSION_VALUE;

      versionComparisonResult = compareVersions(currentVersion, reqVersion);

      if (versionComparisonResult > 0) {
        dataCorrupted = true;
        corruptedDataErrorMessage =
          "the current version is more recent than the required version";
      } else if (versionComparisonResult === 0) {
        isUpToDate = true;
      }
    } else {
      isUpToDate = false;
    }
  }

  const result = <DataSourceUpdateResult>{
    success: !dataCorrupted,
    errorType: dataCorrupted
      ? DataSourceUpdateErrorType.CorruptedData
      : DataSourceUpdateErrorType.None,
    errorMessage: dataCorrupted
      ? `Data source metadata file contains corrupted data: ${corruptedDataErrorMessage}`
      : null,
    isUpToDate: isUpToDate,
  };

  return result;
};
