import {
  BLANK_VERSION_VALUE,
  CURRENT_VERSION_VALUE,
  TypedDataCollectionUpdateBase,
  DataSourceCollectionsUpdateBase,
  DataCollectionUpdateBase,
  DataSourceUpdateResult,
  DataSourceUpdateOptions,
  DataSourceUpdateErrorType,
} from "./index.js";

import {
  DataCollectionBase,
  DataSourceBase,
  DataSourceMetadata,
} from "../data-collection.js";

import { DataSourceUpdateBase } from "./data-source.js";

export abstract class UpdateManagerBase<
  TMetadataCollection extends DataCollectionBase<
    DataSourceMetadata,
    DataSourceMetadata
  >
> {
  requiredVersion: string;
  currentVersion?: string;

  constructor(requiredVersion: string, currentVersion?: string) {
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
    return update;
  }
}
