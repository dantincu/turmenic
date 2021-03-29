import {
  EnvConfig,
  envBaseDir,
} from "../../../../src.node.common/appSettings/envConfig.js";

import {
  DataCollectionBase,
  DataSourceMetadata,
  BLANK_VERSION_VALUE,
} from "../data-collection.js";

import {
  AbstractDataSource,
  DataSourceUpdateResult,
  isUpToDate,
  DataSourceBase,
} from "../data-source.js";

import { DataSourceUpdateBase } from "./data-source.js";

export interface UpdateManagerOptions<
  TMetadataCollection extends DataCollectionBase<
    DataSourceMetadata,
    DataSourceMetadata
  >,
  TDataSource extends DataSourceBase<TMetadataCollection>
> {
  envConfig: EnvConfig;
  dataSource: TDataSource;
  metadataCollection: TMetadataCollection;
  requiredVersion: string;
  currentVersion?: string;
}

export abstract class UpdateManagerBase<
  TMetadataCollection extends DataCollectionBase<
    DataSourceMetadata,
    DataSourceMetadata
  >,
  TDataSource extends DataSourceBase<TMetadataCollection>
> {
  envConfig: EnvConfig;
  dataSource: TDataSource;
  metadataCollection: TMetadataCollection;
  requiredVersion: string;
  currentVersion?: string;

  constructor(opts: UpdateManagerOptions<TMetadataCollection, TDataSource>) {
    this.envConfig = opts.envConfig;
    this.dataSource = opts.dataSource;
    this.metadataCollection = opts.metadataCollection;
    this.requiredVersion = opts.requiredVersion;
    this.currentVersion = opts.currentVersion;
  }

  abstract getAllUpdateComponents(): DataSourceUpdateBase<
    TMetadataCollection,
    TDataSource
  >[];

  public async executeUpdate(): Promise<DataSourceUpdateResult> {
    const update = this.getUpdateComponent();
    const dataSourceUpdateResult: DataSourceUpdateResult = await update.Update(
      this.requiredVersion
    );

    return dataSourceUpdateResult;
  }

  public async assureUpToDate(): Promise<void> {
    let isUpToDateRetObj = await isUpToDate(
      this.metadataCollection,
      this.requiredVersion
    );

    if (isUpToDateRetObj.isUpToDate === false) {
      isUpToDateRetObj = await this.executeUpdate();
    }

    if (isUpToDateRetObj.isUpToDate !== true) {
      throw new Error(
        `Data source ${this.dataSource.dataSourceName} is not up to date and could not be updated`
      );
    }
  }

  getUpdateComponent(): DataSourceUpdateBase<TMetadataCollection, TDataSource> {
    const allUpdates: DataSourceUpdateBase<
      TMetadataCollection,
      TDataSource
    >[] = this.getAllUpdateComponents();

    const filteredUpdates = allUpdates.filter(
      (update) => update.requiredVersion === this.requiredVersion
    );

    if (filteredUpdates.length !== 1) {
      throw new Error(
        `Expected exactly 1 matching update but found ${filteredUpdates.length}`
      );
    }

    const update = filteredUpdates.pop();
    return <DataSourceUpdateBase<TMetadataCollection, TDataSource>>update;
  }
}
