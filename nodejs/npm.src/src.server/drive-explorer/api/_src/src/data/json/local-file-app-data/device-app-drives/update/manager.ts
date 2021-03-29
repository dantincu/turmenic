import { EnvConfig } from "../../../../../../src.node.common/appSettings/envConfig.js";
import {
  UpdateManagerBase,
  UpdateManagerOptions,
} from "../../../../../../src.node.common/data/json/update/manager.js";
import { DataSourceUpdateBase } from "../../../../../../src.node.common/data/json/update/data-source.js";

import { AppMetadataLocalFileCollection } from "../../index.js";
import { appLocalFileDataSourceInfo } from "../../index.js";
import { DeviceAppDrivesDataSource } from "../data-source.js";
import { DeviceAppDrives_Init_To_V_0_1_0_Update } from "./init-to-v0_1_0.js";

export class DeviceAppDrivesUpdateManager extends UpdateManagerBase<
  AppMetadataLocalFileCollection,
  DeviceAppDrivesDataSource
> {
  constructor(
    opts: UpdateManagerOptions<
      AppMetadataLocalFileCollection,
      DeviceAppDrivesDataSource
    >
  ) {
    super(opts);
  }

  getAllUpdateComponents(): DataSourceUpdateBase<
    AppMetadataLocalFileCollection,
    DeviceAppDrivesDataSource
  >[] {
    const appMetadataLocalFileCollection = new AppMetadataLocalFileCollection(
      this.envConfig
    );

    const allUpdateComponents: DataSourceUpdateBase<
      AppMetadataLocalFileCollection,
      DeviceAppDrivesDataSource
    >[] = [
      new DeviceAppDrives_Init_To_V_0_1_0_Update(
        this.dataSource,
        this.requiredVersion
      ),
    ];

    return allUpdateComponents;
  }
}
