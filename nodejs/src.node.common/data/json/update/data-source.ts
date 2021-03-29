import { DataCollectionBase } from "../data-collection.js";
import { DataSourceBase } from "../data-source.js";
import { UpdateEngineBase } from "./engine.js";
import { DataSourceUpdateOptions } from "./index.js";

import { DataSourceMetadata, BLANK_VERSION_VALUE } from "../data-collection.js";
import { DataSourceUpdateResult, isUpToDate } from "../data-source.js";

export abstract class DataSourceUpdateBase<
  TMetadataCollection extends DataCollectionBase<
    DataSourceMetadata,
    DataSourceMetadata
  >,
  TDataSource extends DataSourceBase<TMetadataCollection>
> {
  dataSource: TDataSource;
  metadata: DataSourceMetadata | null;
  currentVersion: string;
  requiredVersion: string;

  constructor(opts: DataSourceUpdateOptions<TMetadataCollection, TDataSource>) {
    this.dataSource = opts.dataSource;
    this.metadata = null;
    this.currentVersion = BLANK_VERSION_VALUE;
    this.requiredVersion = opts.requiredVersion;
  }

  abstract getAllEngines(): UpdateEngineBase<
    TMetadataCollection,
    TDataSource
  >[];

  getEngine(): UpdateEngineBase<TMetadataCollection, TDataSource> {
    const allEngines = this.getAllEngines();
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
    return engine as UpdateEngineBase<TMetadataCollection, TDataSource>;
  }

  public async Update(reqVersion: string): Promise<DataSourceUpdateResult> {
    let isUpToDateResult = await this.IsUpToDateCore(reqVersion);

    if (isUpToDateResult.success) {
      if (isUpToDateResult.isUpToDate !== true) {
        const engine = this.getEngine();
        await this.dataSource.get(true);

        let isUpToDate = await engine.run();
        isUpToDate = isUpToDate && (await this.dataSource.save(true)).success;

        isUpToDateResult.isUpToDate = isUpToDate;
      }
    }

    return isUpToDateResult;
  }

  public async IsUpToDate(reqVersion: string): Promise<DataSourceUpdateResult> {
    const result = await this.IsUpToDateCore(reqVersion);
    return result;
  }

  async IsUpToDateCore(reqVersion: string): Promise<DataSourceUpdateResult> {
    const result = await isUpToDate(
      this.dataSource.metadataCollection,
      reqVersion
    );
    return result;
  }
}
