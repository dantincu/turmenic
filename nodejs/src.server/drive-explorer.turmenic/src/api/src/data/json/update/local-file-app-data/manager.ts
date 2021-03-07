import {
  EnvConfig,
  envBaseDir,
} from "../../../../../src.common/appSettings/envConfig.js";

import { UpdateManagerBase } from "../../../../../src.common/data/json/update/manager.js";

import {
  DataCollectionBase,
  DataSourceBase,
  DataSourceMetadata,
} from "../../../../../src.common/data/json/data-collection.js";

import {
  AppLocalFileCollection,
  AppMetadataLocalFileCollection,
  DeviceDirLocationTypeCollection,
  DATA_SOURCE_NAME,
  DATA_SOURCE_DIR_REL_PATH,
  CloudStoragePlatformCollection,
  CloudStorageDeviceDirLocationCollection,
  DeviceRootDirLocationCollection,
  ServicePlatformCollection,
  ServicePlatformUserAccountCollection,
} from "../../local-file-app-data/index.js";

import { DataSourceUpdateBase } from "../../../../../src.common/data/json/update/data-source.js";
import { AppLocalFileDataSource } from "../../local-file-app-data/data-source.js";

import { REQUIRED_VERSION_VALUE } from "../../local-file-app-data/index.js";
import { AppLocalFile_Init_To_V_0_0_1_Update } from "./init-to-v0_0_1.js";

export class AppLocalFileUpdateManager extends UpdateManagerBase<AppMetadataLocalFileCollection> {
  constructor(envConfig: EnvConfig, dataSource: AppLocalFileDataSource) {
    super(envConfig, dataSource, REQUIRED_VERSION_VALUE);
  }

  getAllUpdateComponents(): DataSourceUpdateBase<AppMetadataLocalFileCollection>[] {
    const appMetadataLocalFileCollection = new AppMetadataLocalFileCollection(
      this.envConfig
    );

    const allUpdateComponents: DataSourceUpdateBase<AppMetadataLocalFileCollection>[] = [
      new AppLocalFile_Init_To_V_0_0_1_Update(
        <AppLocalFileDataSource>this.dataSource,
        appMetadataLocalFileCollection,
        this.requiredVersion
      ),
    ];

    return allUpdateComponents;
  }
}
