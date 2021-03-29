import { DataCollectionBase, DataSourceMetadata } from "../data-collection.js";
import { DataSourceBase } from "../data-source.js";
import { DataSourceUpdateOptions } from "./index.js";

export abstract class AbstractUpdateEngine {
  readonly fromVersion: string;
  readonly toVersion: string;

  abstract getFromVersion(): string;
  abstract getToVersion(): string;
  abstract run(): Promise<boolean>;

  constructor() {
    this.fromVersion = this.getFromVersion();
    this.toVersion = this.getToVersion();
  }
}

export abstract class UpdateEngineBase<
  TMetadataCollection extends DataCollectionBase<
    DataSourceMetadata,
    DataSourceMetadata
  >,
  TDataSource extends DataSourceBase<TMetadataCollection>
> extends AbstractUpdateEngine {
  dataSource: TDataSource;

  constructor(dataSource: TDataSource) {
    super();

    this.dataSource = dataSource;
  }
}
