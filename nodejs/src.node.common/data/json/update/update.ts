import { DataCollectionBase, DataSourceMetadata } from "../data-collection.js";
import { DataSourceBase } from "../data-source.js";

export class DataSourceUpdateOptions<
  TMetadataCollection extends DataCollectionBase<
    DataSourceMetadata,
    DataSourceMetadata
  >,
  TDataSource extends DataSourceBase<TMetadataCollection>
> {
  dataSource: TDataSource;
  requiredVersion: string;

  constructor(dataSource: TDataSource, requiredVersion: string) {
    this.dataSource = dataSource;
    this.requiredVersion = requiredVersion;
  }
}
