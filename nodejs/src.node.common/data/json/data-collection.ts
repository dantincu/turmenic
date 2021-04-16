import { Mutex } from "async-mutex";
import slug from "slug";

import { EnvConfig } from "../../../src.node.common/appSettings/envConfig.js";
import {
  cloneDeep,
  cloneArrDeep,
  getPropVal,
  setPropVal,
} from "../../../src.common/utils/types.js";
import { compareVersions } from "../../../src.common/text/pckg.js";

import { uStrId } from "../uStrId.js";

export const BLANK_VERSION_VALUE = "0.0.0";

export interface DataSaveOptions<TData, TJsonData> {
  uuidPropName?: string;
  namePropName?: string;
  keyPropName?: string;
  keyGenerator?: ((dataItem: TData) => string | null) | null;
}

export const getDefaultSaveOptions = <TData, TJsonData>(): DataSaveOptions<
  TData,
  TJsonData
> => {
  const namePropName = "name";

  const dataSaveOptions = <DataSaveOptions<TData, TJsonData>>{
    uuidPropName: "uuid",
    namePropName: "name",
    keyPropName: "key",
    keyGenerator: getDefaultKeyGenerator(namePropName),
  };

  dataSaveOptions.keyGenerator = getDefaultKeyGenerator(
    dataSaveOptions.namePropName
  );
  return dataSaveOptions;
};

export const getDefaultKeyGenerator = <TData>(
  namePropName?: string | null
): ((dataItem: TData) => string | null) | null => {
  let keyGenerator: ((dataItem: TData) => string | null) | null = null;

  if (namePropName) {
    keyGenerator = (item: TData): string | null => {
      const itemName: string | null = getPropVal(item, namePropName);

      const key = itemName ? slug(itemName) : null;
      return key;
    };
  }

  return keyGenerator;
};

export enum DataSaveErrorType {
  None = 0,
  FileConflict = 1,
  Unknown = 2,
}

export interface AbstractDataSaveResult {
  success: boolean;
  errorMessage?: string;
  errorType: DataSaveErrorType;
  newLastModifiedTime: Date;
}

export interface DataSaveResult<TData, TJsonData>
  extends AbstractDataSaveResult {
  inserted: TData[];
  jsonDataList: TJsonData[];
}

export abstract class AbstractDataCollectionOptions {
  envConfig: EnvConfig;
  dataSourceName: string;
  collectionName: string;

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

export class DataCollectionOptions<
  TData,
  TJsonData
> extends AbstractDataCollectionOptions {
  dataSaveOptions?: DataSaveOptions<TData, TJsonData>;

  constructor(
    envConfig: EnvConfig,
    dataSourceName: string,
    collectionName: string
  ) {
    super(envConfig, dataSourceName, collectionName);
  }
}

export interface JsonDataCollection<TJsonData> {
  dataItems: TJsonData[];
}

export interface JsonDataContainer<TJsonData> {
  collection: JsonDataCollection<TJsonData>;
  lastModifiedTime: Date;
}

export abstract class AbstractDataCollection {
  readonly envConfig: EnvConfig;
  readonly dataSourceName: string;
  readonly collectionName: string;
  readonly dataAccessMutex: Mutex;
  data?: any[];
  lastModifiedTime?: Date;

  constructor(opts: AbstractDataCollectionOptions) {
    this.envConfig = opts.envConfig;
    this.dataSourceName = opts.dataSourceName;
    this.collectionName = opts.collectionName;
    this.dataAccessMutex = new Mutex();
  }

  public abstract load(): Promise<any[]>;
  public abstract save(
    data?: any[] | null,
    safeMode?: boolean
  ): Promise<AbstractDataSaveResult>;

  async beforeSavePrep(safeMode?: boolean): Promise<boolean> {
    return true;
  }
  async afterSaveCleanup(safeMode?: boolean): Promise<boolean> {
    return true;
  }

  async onBeginDataAccess(
    write: boolean,
    safeMode?: boolean | null | undefined
  ): Promise<void> {}
  async onEndDataAccess(
    write: boolean,
    safeMode?: boolean | null | undefined
  ): Promise<void> {}
}

export abstract class DataCollectionBase<
  TData,
  TJsonData
> extends AbstractDataCollection {
  dataSaveOptions: DataSaveOptions<TData, TJsonData>;
  lastModifiedTime?: Date;
  currentData?: TData[];
  insertedUuids?: string[] | null;

  constructor(opts: DataCollectionOptions<TData, TJsonData>) {
    super(opts);
    this.dataSaveOptions = opts.dataSaveOptions ?? getDefaultSaveOptions();
  }

  public async runOp(
    op: () => Promise<boolean>,
    safeMode?: boolean | null
  ): Promise<DataSaveResult<TData, TJsonData> | null> {
    let dataSaveResult: DataSaveResult<TData, TJsonData> | null = null;

    await this.dataAccessMutex.runExclusive(async () => {
      const saveData = await op();

      if (saveData) {
        dataSaveResult = await this.saveData(this.currentData, safeMode);
      }
    });

    return dataSaveResult;
  }

  public async load(): Promise<any[]> {
    let data: any[] | null = null;

    await this.dataAccessMutex.runExclusive(async () => {
      data = await this.loadDataOp();
    });

    return (data as unknown) as any[];
  }

  public async loadData(): Promise<TData[]> {
    let data: TData[] | null = null;

    await this.dataAccessMutex.runExclusive(async () => {
      data = await this.loadDataOp();
    });

    return (data as unknown) as TData[];
  }

  public async save(
    data?: any[] | null,
    safeMode?: boolean | null
  ): Promise<AbstractDataSaveResult> {
    let dataSaveResult: AbstractDataSaveResult | null = null;

    await this.dataAccessMutex.runExclusive(async () => {
      dataSaveResult = await this.saveDataOp(data as TData[] | null, safeMode);
    });

    if (!dataSaveResult) {
      throw new Error("Something went wrong; no data returned");
    }

    return dataSaveResult;
  }

  public async saveData(
    data?: any[] | null,
    safeMode?: boolean | null
  ): Promise<DataSaveResult<TData, TJsonData>> {
    let dataSaveResult: DataSaveResult<TData, TJsonData> | null = null;

    await this.dataAccessMutex.runExclusive(async () => {
      dataSaveResult = await this.saveDataOp(data as TData[] | null, safeMode);
    });

    if (!dataSaveResult) {
      throw new Error("Something went wrong; no data returned");
    }

    return dataSaveResult;
  }

  public async insert(
    items: TData[],
    safeMode?: boolean | null
  ): Promise<DataSaveResult<TData, TJsonData> | null> {
    let dataSaveResult: DataSaveResult<TData, TJsonData> | null = null;

    await this.dataAccessMutex.runExclusive(async () => {
      this.currentData = this.currentData ?? [];

      for (let itm of items) {
        this.currentData.push(itm);
      }

      this.insertUuids(items);
      dataSaveResult = await this.saveDataOp(this.currentData, safeMode);
    });

    if (!dataSaveResult) {
      throw new Error("Something went wrong; no data returned");
    }

    return dataSaveResult;
  }

  async loadDataOp() {
    await this.onBeginDataAccess(false);

    const jsonData = await this.loadJsonData();
    this.lastModifiedTime = jsonData.lastModifiedTime;

    let currentData = this.getDataForFetch(jsonData);
    this.data = currentData;
    this.currentData = currentData;

    await this.onEndDataAccess(false);
    return currentData;
  }

  async saveDataOp(
    dataList?: TData[] | null,
    safeMode?: boolean | null
  ): Promise<DataSaveResult<TData, TJsonData>> {
    dataList = dataList ?? this.currentData ?? [];
    safeMode = safeMode ?? false;

    await this.onBeginDataAccess(true, safeMode);
    this.insertedUuids = this.insertedUuids ?? [];

    const jsonData = this.getJsonDataForSave(dataList, this.insertedUuids);
    const dataSaveResultRaw = await this.saveJsonData(jsonData, safeMode);

    dataList = this.getDataForFetch(jsonData);

    const dataSaveResult = dataSaveResultRaw as DataSaveResult<
      TData,
      TJsonData
    >;

    dataSaveResult.inserted = this.getInsertedItems(
      dataList,
      this.insertedUuids
    );

    this.currentData = dataList;
    this.insertedUuids = null;

    await this.onEndDataAccess(true, safeMode);
    return dataSaveResult;
  }

  getInsertedItems(dataList: TData[], insertedUuids: string[]): TData[] {
    let inserted: TData[] | null = null;
    let uuidPropName = this.dataSaveOptions.uuidPropName;

    if (uuidPropName) {
      inserted = dataList.filter(
        (item) =>
          insertedUuids.indexOf(getPropVal(item, uuidPropName) as string) >= 0
      );
    }

    return inserted ?? [];
  }

  insertUuids(dataList: TData[]) {
    let uuidPropName = this.dataSaveOptions.uuidPropName;

    if (uuidPropName) {
      for (let item of dataList) {
        const uuid = getPropVal(item, uuidPropName) as string | null;
        if (uuid) {
          this.insertedUuids?.push(uuid);
        }
      }
    }
  }

  abstract loadJsonData(): Promise<JsonDataContainer<TJsonData>>;
  abstract saveJsonData(
    jsonData: JsonDataContainer<TJsonData>,
    safeMode?: boolean | null
  ): Promise<DataSaveResult<TData, TJsonData>>;

  getJsonDataForSave(
    dataList: TData[],
    insertedUuids: string[]
  ): JsonDataContainer<TJsonData> {
    const jsonDataList = dataList.map((dataItem) =>
      this.getDataItemForSave(dataItem, dataList, insertedUuids)
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

  getDataItemForSave(
    dataItem: TData,
    dataList: TData[],
    insertedUuids: string[]
  ): TJsonData {
    const clonedDataItem = cloneDeep(dataItem);
    this.assureDataItemHasUuid(clonedDataItem, insertedUuids);

    this.assureDataItemHasUniqueKey(clonedDataItem, dataItem, dataList);
    const jsonData = (clonedDataItem as unknown) as TJsonData;

    return jsonData;
  }

  getDataItemForFetch(jsonDataItem: TJsonData): TData {
    const dataItem = (cloneDeep(jsonDataItem) as unknown) as TData;
    return dataItem;
  }

  assureDataItemHasUuid(dataItem: TData, insertedUuids: string[]) {
    const uuidPropName = this.dataSaveOptions.uuidPropName;
    let uuid: string | null = null;

    if (uuidPropName) {
      uuid = this.generateUuid();
      if (getPropVal(dataItem, uuidPropName)) {
        setPropVal(dataItem, uuidPropName, uuid);
        insertedUuids.push(uuid);
      }
    }

    return uuid;
  }

  assureDataItemHasUniqueKey(
    clonedDataItem: TData,
    dataItem: TData,
    dataList: TData[]
  ) {
    const keyPropName = this.dataSaveOptions.keyPropName;
    const namePropName = this.dataSaveOptions.namePropName;

    if (keyPropName) {
      if (!getPropVal(clonedDataItem, keyPropName)) {
        if (namePropName) {
          setPropVal(
            clonedDataItem,
            keyPropName,
            this.generateUniqueKey(clonedDataItem, dataList)
          );
        }
      } else {
        this.assertKeyUnique(clonedDataItem, dataItem, dataList);
      }
    }
  }

  generateUuid(): string {
    const uuid = uStrId();
    return uuid;
  }

  generateUniqueKey(dataItem: TData, dataList: TData[]) {
    let keySlug = this.dataSaveOptions.keyGenerator?.call(this, dataItem);
    let suffix = 0;
    let key = keySlug;

    if (key) {
      while (
        dataList.find(
          (item) =>
            getPropVal(item, this.dataSaveOptions.keyPropName) === keySlug
        )
      ) {
        key = `${keySlug}_${suffix}`;
      }
    }

    return key;
  }

  assertKeyUnique(clonedDataItem: TData, dataItem: TData, dataList: TData[]) {
    if (this.isKeyUnique(clonedDataItem, dataItem, dataList) === false) {
      const keyPropName = this.dataSaveOptions.keyPropName;

      throw new Error(
        `Duplicate key found: key prop name: ${keyPropName}; key prop value: ${getPropVal(
          dataItem,
          keyPropName
        )}`
      );
    }
  }

  isKeyUnique(clonedDataItem: TData, dataItem: TData, dataList: TData[]) {
    let isUnique: boolean | null = null;
    const keyPropName = this.dataSaveOptions.keyPropName;

    if (keyPropName) {
      const collidingItem = dataList.find(
        (item) =>
          item !== dataItem &&
          getPropVal(item, keyPropName) ===
            getPropVal(clonedDataItem, keyPropName)
      );

      isUnique = !collidingItem;
    }

    return isUnique;
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
