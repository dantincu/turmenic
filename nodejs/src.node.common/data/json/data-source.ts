import { Mutex } from "async-mutex";
import { EnvConfig } from "../../../src.node.common/appSettings/envConfig.js";
import { cloneDeep, GenericHash } from "../../../src.common/utils/types.js";
import { compareVersions } from "../../../src.common/text/pckg.js";

import {
  AbstractDataCollection,
  MetadataCollectionBase,
  AbstractDataCollectionOptions,
  DataCollectionBase,
  BLANK_VERSION_VALUE,
  DataCollectionOptions,
  AbstractDataSaveResult,
  DataSaveErrorType,
  DataSaveOptions,
  DataSaveResult,
  DataSourceMetadata,
  JsonDataCollection,
  JsonDataContainer,
} from "./data-collection.js";

export interface DataSourceSaveResult {
  success: boolean;
  saveResults: AbstractDataSaveResult[];
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

export class AbstractDataSourceOptions {
  envConfig: EnvConfig;
  dataSourceName: string;

  constructor(envConfig: EnvConfig, dataSourceName: string) {
    this.envConfig = envConfig;
    this.dataSourceName = dataSourceName;
  }
}

export class DataSourceOptions<
  TMetadataCollection extends DataCollectionBase<
    DataSourceMetadata,
    DataSourceMetadata
  >
> extends AbstractDataSourceOptions {
  metadataCollection: TMetadataCollection;

  constructor(
    envConfig: EnvConfig,
    dataSourceName: string,
    metadataCollection: TMetadataCollection
  ) {
    super(envConfig, dataSourceName);
    this.metadataCollection = metadataCollection;
  }
}

export abstract class AbstractDataSource {
  readonly envConfig: EnvConfig;
  readonly dataSourceName: string;
  readonly dataAccessMutex: Mutex;
  readonly dataCollections: GenericHash<AbstractDataCollection>;

  constructor(opts: AbstractDataSourceOptions) {
    this.envConfig = opts.envConfig;
    this.dataSourceName = opts.dataSourceName;
    this.dataAccessMutex = new Mutex();
    this.dataCollections = {};
  }

  abstract beforeSavePrep(safeMode?: boolean): Promise<boolean>;
  abstract afterSaveCleanup(safeMode?: boolean): Promise<boolean>;

  public async get(refresh: boolean): Promise<GenericHash<any[]>> {
    const retHash: GenericHash<any[]> = {};

    await this.dataAccessMutex.runExclusive(async () => {
      for (const [dataCollName, dataColl] of Object.entries(
        this.dataCollections
      )) {
        retHash[dataCollName] = await dataColl.get(refresh);
      }
    });

    return retHash;
  }

  public async save(safeMode?: boolean): Promise<DataSourceSaveResult> {
    let dataSaveResult: DataSourceSaveResult | null = null;

    await this.dataAccessMutex.runExclusive(async () => {
      dataSaveResult = {
        success: await this.beforeSavePrep(safeMode),
        saveResults: [],
      };

      for (const [dataCollName, dataColl] of Object.entries(
        this.dataCollections
      )) {
        dataSaveResult.saveResults.push(await dataColl.save(null, safeMode));
      }

      dataSaveResult.success = await this.afterSaveCleanup(safeMode);
    });

    if (!dataSaveResult) {
      throw new Error("Something went wrong; no data returned");
    }

    return dataSaveResult;
  }
}

export abstract class DataSourceBase<
  TMetadataCollection extends DataCollectionBase<
    DataSourceMetadata,
    DataSourceMetadata
  >
> extends AbstractDataSource {
  metadataCollection: TMetadataCollection;

  constructor(opts: DataSourceOptions<TMetadataCollection>) {
    super(opts);
    this.metadataCollection = opts.metadataCollection;
  }

  addCollection<
    TData,
    TJsonData,
    TCollection extends DataCollectionBase<TData, TJsonData>
  >(collection: TCollection) {
    if (!collection) {
      throw new Error("Added collection cannot be null");
    }

    if (this.dataCollections[collection.collectionName]) {
      throw new Error(
        `Collection with name ${collection.collectionName} already added`
      );
    }

    this.dataCollections[collection.collectionName] = collection;
  }

  async beforeSavePrep(safeMode?: boolean): Promise<boolean> {
    const result = await this.metadataCollection.beforeSavePrep(safeMode);
    return result;
  }

  async afterSaveCleanup(safeMode?: boolean): Promise<boolean> {
    const result = await this.metadataCollection.afterSaveCleanup(safeMode);
    return result;
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
  const updateResult = await isUpToDate(metadataCollection, reqVersion);

  if (!updateResult.success || updateResult.isUpToDate !== true) {
    err = err ?? new Error(updateResult.errorMessage);
    throw err;
  }
};

export const isUpToDate = async (
  metadataCollection: DataCollectionBase<
    DataSourceMetadata,
    DataSourceMetadata
  >,
  reqVersion: string
): Promise<DataSourceUpdateResult> => {
  const metadataList = await metadataCollection.get(true);
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

export interface DataSourceInfo {
  dataSourceName: string;
}

export interface VersionedDataSourceInfo extends DataSourceInfo {
  requiredVersion: string;
}
