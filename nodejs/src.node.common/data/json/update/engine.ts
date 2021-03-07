import { DataSourceBase } from "../data-collection.js";

import { DataSourceCollectionsUpdateBase } from "./index.js";

export abstract class UpdateEngineBase {
  readonly fromVersion: string;
  readonly toVersion: string;

  abstract getFromVersion(): string;
  abstract getToVersion(): string;
  abstract run(): Promise<void>;

  constructor() {
    this.fromVersion = this.getFromVersion();
    this.toVersion = this.getToVersion();
  }
}

export abstract class TypedUpdateEngineBase<
  TDataSourceCollectionsUpdateBase extends DataSourceCollectionsUpdateBase
> extends UpdateEngineBase {
  readonly dataSourceCollectionsUpdate: TDataSourceCollectionsUpdateBase;

  constructor(dataSourceCollectionsUpdate: TDataSourceCollectionsUpdateBase) {
    super();
    this.dataSourceCollectionsUpdate = dataSourceCollectionsUpdate;
  }
}
