import { EnvConfig } from "../../../../../src.node.common/appSettings/envConfig.js";
import {
  UpdateManagerBase,
  UpdateManagerOptions,
} from "../../../../../src.node.common/data/json/update/manager.js";
import {
  AppMetadataLocalFileCollection,
  appLocalFileDataSourceInfo,
} from "../index.js";

import { DataSourceUpdateBase } from "../../../../../src.node.common/data/json/update/data-source.js";
import { AppLocalFileDataSource } from "../data-source.js";

import { AppLocalFile_Init_To_V_0_1_0_Update } from "./init-to-v0_1_0.js";

export class AppLocalFileUpdateManager extends UpdateManagerBase<
  AppMetadataLocalFileCollection,
  AppLocalFileDataSource
> {
  constructor(
    opts: UpdateManagerOptions<
      AppMetadataLocalFileCollection,
      AppLocalFileDataSource
    >
  ) {
    super(opts);
  }

  getAllUpdateComponents(): DataSourceUpdateBase<
    AppMetadataLocalFileCollection,
    AppLocalFileDataSource
  >[] {
    const appMetadataLocalFileCollection = new AppMetadataLocalFileCollection(
      this.envConfig
    );

    const allUpdateComponents: DataSourceUpdateBase<
      AppMetadataLocalFileCollection,
      AppLocalFileDataSource
    >[] = [
      new AppLocalFile_Init_To_V_0_1_0_Update(
        this.dataSource,
        this.requiredVersion
      ),
    ];

    return allUpdateComponents;
  }
}
