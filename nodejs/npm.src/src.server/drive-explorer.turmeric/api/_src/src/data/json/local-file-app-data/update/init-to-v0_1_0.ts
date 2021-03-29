import { EnvConfig } from "../../../../../src.node.common/appSettings/envConfig.js";

import { DataSourceUpdateOptions } from "../../../../../src.node.common/data/json/update/index.js";
import { DataSourceUpdateBase } from "../../../../../src.node.common/data/json/update/data-source.js";

import {
  DataSourceMetadata,
  BLANK_VERSION_VALUE,
} from "../../../../../src.node.common/data/json/data-collection.js";

import { UpdateEngineBase } from "../../../../../src.node.common/data/json/update/engine.js";
import { AppLocalFileDataSource } from "../data-source.js";

import {
  AppMetadataLocalFileCollection,
  DeviceDirLocationTypeCollection,
  CloudStoragePlatformCollection,
  CloudStorageDeviceDirLocationCollection,
  DeviceRootDirLocationCollection,
  ServicePlatformCollection,
  ServicePlatformUserAccountCollection,
} from "../index.js";

import {
  CloudStorageDeviceDirLocation,
  DeviceDirLocationType,
  DeviceRootDirLocation,
} from "../../../../../src.node.common/app-data/schema/device-dir-locations.schema.js";

import {
  CloudStoragePlatform,
  ServicePlatform,
  ServicePlatformUserAccount,
} from "../../../../../src.node.common/app-data/schema/service-providers.schema.js";

import {
  cloudStorageDeviceDirLocations,
  deviceRootDirLocations,
  servicePlatformUserAccounts,
} from "../../../userData.js";

import { cloudStoragePlatforms } from "../../../app-data/cloudStoragePlatforms.js";
import { deviceDirLocationTypes } from "../../../app-data/deviceDirLocationTypes.js";
import { servicePlatforms } from "../../../app-data/servicePlatforms.js";

export class AppLocalFile_Init_To_V_0_1_0_UpdateOptions extends DataSourceUpdateOptions<
  AppMetadataLocalFileCollection,
  AppLocalFileDataSource
> {
  constructor(dataSource: AppLocalFileDataSource, requiredVersion: string) {
    super(dataSource, requiredVersion);
  }
}

export class AppLocalFile_Init_To_V_0_1_0_Update extends DataSourceUpdateBase<
  AppMetadataLocalFileCollection,
  AppLocalFileDataSource
> {
  constructor(dataSource: AppLocalFileDataSource, requiredVersion: string) {
    super(
      new AppLocalFile_Init_To_V_0_1_0_UpdateOptions(
        dataSource,
        requiredVersion
      )
    );
  }

  getAllEngines(): UpdateEngineBase<
    AppMetadataLocalFileCollection,
    AppLocalFileDataSource
  >[] {
    const allEngines: UpdateEngineBase<
      AppMetadataLocalFileCollection,
      AppLocalFileDataSource
    >[] = [
      new AppLocalFile_Init_To_V_0_1_0_UpdateEngine(
        this.dataSource as AppLocalFileDataSource
      ),
    ];

    return allEngines;
  }
}

export class AppLocalFile_Init_To_V_0_1_0_UpdateEngine extends UpdateEngineBase<
  AppMetadataLocalFileCollection,
  AppLocalFileDataSource
> {
  constructor(dataSource: AppLocalFileDataSource) {
    super(dataSource);
  }

  getFromVersion(): string {
    const fromVersion = BLANK_VERSION_VALUE;
    return fromVersion;
  }

  getToVersion(): string {
    const toVersion = "0.1.0";
    return toVersion;
  }

  async run(): Promise<boolean> {
    const dataSource = this.dataSource as AppLocalFileDataSource;

    dataSource.cloudStorageDeviceDirLocationCollection.currentData = cloudStorageDeviceDirLocations;
    dataSource.deviceRootDirLocationCollection.currentData = deviceRootDirLocations;
    dataSource.servicePlatformUserAccountCollection.currentData = servicePlatformUserAccounts;
    dataSource.cloudStoragePlatformCollection.currentData = cloudStoragePlatforms;
    dataSource.deviceDirLocationTypeCollection.currentData = deviceDirLocationTypes;
    dataSource.servicePlatformCollection.currentData = servicePlatforms;

    this.dataSource.metadataCollection.currentData = [
      <DataSourceMetadata>{
        dataSourceVersion: this.toVersion,
      },
    ];

    return true;
  }
}
