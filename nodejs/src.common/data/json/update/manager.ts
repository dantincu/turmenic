import {
  EnvConfig,
  envBaseDir,
} from "../../../../src.common/appSettings/envConfig.js";

import {
  TypedDataCollectionUpdateBase,
  DataSourceCollectionsUpdateBase,
  DataCollectionUpdateBase,
  DataSourceUpdateOptions,
} from "./index.js";

import {
  DataCollectionBase,
  DataSourceBase,
  DataSourceMetadata,
  DataSourceUpdateResult,
  BLANK_VERSION_VALUE,
} from "../data-collection.js";

import { DataSourceUpdateBase } from "./data-source.js";

export abstract class UpdateManagerBase<
  TMetadataCollection extends DataCollectionBase<
    DataSourceMetadata,
    DataSourceMetadata
  >
> {
  envConfig: EnvConfig;
  dataSource: DataSourceBase;
  requiredVersion: string;
  currentVersion?: string;

  constructor(
    envConfig: EnvConfig,
    dataSource: DataSourceBase,
    requiredVersion: string,
    currentVersion?: string
  ) {
    this.envConfig = envConfig;
    this.dataSource = dataSource;
    this.requiredVersion = requiredVersion;
    this.currentVersion = currentVersion;
  }

  abstract getAllUpdateComponents(): DataSourceUpdateBase<TMetadataCollection>[];

  public async ExecuteUpdate(): Promise<DataSourceUpdateResult> {
    const update = this.getUpdateComponent();
    const dataSourceUpdateResult: DataSourceUpdateResult = await update.Update(
      this.requiredVersion
    );

    return dataSourceUpdateResult;
  }

  getUpdateComponent(): DataSourceUpdateBase<TMetadataCollection> {
    const allUpdates: DataSourceUpdateBase<TMetadataCollection>[] = this.getAllUpdateComponents();

    const filteredUpdates = allUpdates.filter(
      (update) => update.requiredVersion === this.requiredVersion
    );

    if (filteredUpdates.length !== 1) {
      throw new Error(
        `Expected exacting 1 matching update but found ${filteredUpdates.length}`
      );
    }

    const update = filteredUpdates.pop();
    return <DataSourceUpdateBase<TMetadataCollection>>update;
  }
}
