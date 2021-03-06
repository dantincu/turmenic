import {
  DataCollectionBase,
  DataSourceBase,
  DataSourceMetadata,
} from "../data-collection.js";

export const BLANK_VERSION_VALUE = "0.0.0";
export const CURRENT_VERSION_VALUE = "0.0.1";

export class DataSourceUpdateOptions<
  TMetadataCollection extends DataCollectionBase<
    DataSourceMetadata,
    DataSourceMetadata
  >
> {
  dataSource: DataSourceBase;
  metadataCollection: TMetadataCollection;
  requiredVersion?: string;

  constructor(
    dataSource: DataSourceBase,
    metadataCollection: TMetadataCollection,
    requiredVersion?: string
  ) {
    this.dataSource = dataSource;
    this.metadataCollection = metadataCollection;
    this.requiredVersion = requiredVersion;
  }
}

export enum DataSourceUpdateErrorType {
  None = 0,
  CorruptedData = 1,
  Unknown = 2,
}

export interface DataSourceUpdateResult {
  success: boolean;
  alreadyUpToDate: boolean;
  errorMessage?: string;
  errorType: DataSourceUpdateErrorType;
}

export abstract class DataCollectionUpdateBase {
  public abstract loadData(): Promise<void>;
  public abstract saveData(): Promise<void>;
}

export class TypedDataCollectionUpdateBase<
  TData,
  TJsonData,
  TDataCollection extends DataCollectionBase<TData, TJsonData>
> extends DataCollectionUpdateBase {
  public dataCollection: TDataCollection;
  public data: TData[] | null;

  constructor(dataCollection: TDataCollection) {
    super();
    this.dataCollection = dataCollection;
    this.data = [];
  }

  public async loadData(): Promise<void> {
    this.data = await this.dataCollection.fetch();
  }

  public async saveData(): Promise<void> {
    await this.dataCollection.save(this.data ?? []);
  }
}

export class DataSourceCollectionsUpdateBase {
  collectionsList: DataCollectionUpdateBase[];

  constructor(collectionsList: DataCollectionUpdateBase[]) {
    this.collectionsList = collectionsList;
  }
}
