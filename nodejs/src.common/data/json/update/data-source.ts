import { DataCollectionBase, DataSourceBase } from "../data-collection.js";
import { compareVersions } from "../../../text/pckg.js";
import { UpdateEngineBase } from "./engine.js";
import {
  DataCollectionUpdateBase,
  DataSourceUpdateErrorType,
  DataSourceUpdateOptions,
  DataSourceUpdateResult,
  TypedDataCollectionUpdateBase,
  BLANK_VERSION_VALUE,
  CURRENT_VERSION_VALUE,
  DataSourceCollectionsUpdateBase,
} from "./index.js";

import { DataSourceMetadata } from "../data-collection.js";

export abstract class DataSourceUpdateBase<
  TMetadataCollection extends DataCollectionBase<
    DataSourceMetadata,
    DataSourceMetadata
  >
> {
  dataSource: DataSourceBase;
  metadataCollection: TMetadataCollection;
  metadata: DataSourceMetadata | null;
  currentVersion: string;
  requiredVersion: string;
  collectionsUpdate: DataSourceCollectionsUpdateBase | null;

  constructor(opts: DataSourceUpdateOptions<TMetadataCollection>) {
    this.dataSource = opts.dataSource;
    this.metadataCollection = opts.metadataCollection;
    this.metadata = null;
    this.currentVersion = BLANK_VERSION_VALUE;
    this.requiredVersion = opts.requiredVersion ?? CURRENT_VERSION_VALUE;
    this.collectionsUpdate = null;
  }

  abstract onBeforeLoadAllData(): Promise<void>;
  abstract onAfterLoadAllData(): Promise<void>;

  abstract onBeforeSaveAllData(): Promise<void>;
  abstract onAfterSaveAllData(): Promise<void>;

  abstract getCollectionsUpdate(): DataSourceCollectionsUpdateBase;

  abstract getAllEngines<
    TCollectionsUpdate extends DataSourceCollectionsUpdateBase
  >(collectionsUpdate: TCollectionsUpdate): UpdateEngineBase[];

  getEngine<TCollectionsUpdate extends DataSourceCollectionsUpdateBase>(
    collectionsUpdate: TCollectionsUpdate
  ): UpdateEngineBase {
    const allEngines = this.getAllEngines(collectionsUpdate);
    const filteredEngines = allEngines.filter(
      (eng) =>
        eng.fromVersion === this.currentVersion &&
        eng.toVersion === this.requiredVersion
    );

    if (filteredEngines.length !== 1) {
      throw new Error(
        `There must be exactly 1 matching update engine available, but found ${filteredEngines.length}`
      );
    }

    const engine = filteredEngines.pop();
    return <UpdateEngineBase>engine;
  }

  async loadAllData(): Promise<void> {
    await this.onBeforeLoadAllData();

    for (
      let i = 0;
      i < (this.collectionsUpdate?.collectionsList?.length ?? 0);
      i++
    ) {
      await this.collectionsUpdate?.collectionsList[i].loadData();
    }

    await this.onAfterLoadAllData();
  }

  async saveAllData(): Promise<void> {
    await this.onBeforeSaveAllData();

    for (
      let i = 0;
      i < (this.collectionsUpdate?.collectionsList?.length ?? 0);
      i++
    ) {
      await this.collectionsUpdate?.collectionsList[i].saveData();
    }

    await this.onAfterSaveAllData();
  }

  public async Update(reqVersion: string): Promise<DataSourceUpdateResult> {
    let isUpToDateResult = await this.IsUpToDateCore(reqVersion);

    if (isUpToDateResult.success) {
      if (isUpToDateResult.alreadyUpToDate !== true) {
        this.collectionsUpdate = this.getCollectionsUpdate();
        const engine = this.getEngine(this.collectionsUpdate);
        await this.loadAllData();
        await engine.run();
        await this.saveAllData();
      }
    }

    return isUpToDateResult;
  }

  public async IsUpToDate(reqVersion: string): Promise<DataSourceUpdateResult> {
    const result = await this.IsUpToDateCore(reqVersion);
    return result;
  }

  async IsUpToDateCore(reqVersion: string): Promise<DataSourceUpdateResult> {
    const metadata = await this.metadataCollection.fetch();
    let dataCorrupted = metadata.length > 1;
    let corruptedDataErrorMessage = "the loaded data is ambiguous";
    let versionComparisonResult = 0;
    let isUpToDate = false;

    if (!dataCorrupted) {
      this.metadata = metadata.pop() ?? null;

      if (this.metadata) {
        this.currentVersion =
          this.metadata?.dataSourceVersion ?? BLANK_VERSION_VALUE;

        versionComparisonResult = compareVersions(
          this.currentVersion,
          reqVersion
        );
      }

      if (versionComparisonResult > 0) {
        dataCorrupted = true;
        corruptedDataErrorMessage =
          "the current version is more recent than the required version";
      } else if (versionComparisonResult === 0) {
        isUpToDate = true;
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
      alreadyUpToDate: isUpToDate,
    };

    return result;
  }
}
