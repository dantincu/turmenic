import { EnvConfig } from "../../../../src.node.common/appSettings/envConfig";

import {
  DataCollectionOptions,
  DataSourceMetadata,
  assureUpToDate,
  IsUpToDate,
} from "../../../../src.node.common/data/json/data-collection.js";

import {
  LocalFileCollectionBase,
  LocalFileDataSourceBase,
  LocalFileDataSourceOptions,
} from "../../../../src.node.common/data/json/local-file.js";

import {
  AppLocalFileCollection,
  DeviceDirLocationTypeCollection,
  DATA_SOURCE_NAME,
  DATA_SOURCE_DIR_REL_PATH,
  REQUIRED_VERSION_VALUE,
  CloudStoragePlatformCollection,
  CloudStorageDeviceDirLocationCollection,
  DeviceRootDirLocationCollection,
  ServicePlatformCollection,
  ServicePlatformUserAccountCollection,
  AppMetadataLocalFileCollection,
} from "./index.js";

export class AppLocalFileDataSourceOptions extends LocalFileDataSourceOptions {
  constructor(envConfig: EnvConfig) {
    super(envConfig, DATA_SOURCE_NAME, DATA_SOURCE_DIR_REL_PATH);
  }
}

export class AppLocalFileDataSource extends LocalFileDataSourceBase {
  public readonly metadataCollection: AppMetadataLocalFileCollection;
  public readonly deviceDirLocationTypeCollection: DeviceDirLocationTypeCollection;
  public readonly cloudStoragePlatformCollection: CloudStoragePlatformCollection;
  public readonly cloudStorageDeviceDirLocationCollection: CloudStorageDeviceDirLocationCollection;
  public readonly deviceRootDirLocationCollection: DeviceRootDirLocationCollection;
  public readonly servicePlatformCollection: ServicePlatformCollection;
  public readonly servicePlatformUserAccountCollection: ServicePlatformUserAccountCollection;

  constructor(envConfig: EnvConfig) {
    super(new AppLocalFileDataSourceOptions(envConfig));

    this.metadataCollection = new AppMetadataLocalFileCollection(
      this.envConfig
    );

    this.deviceDirLocationTypeCollection = new DeviceDirLocationTypeCollection(
      this.envConfig
    );

    this.cloudStoragePlatformCollection = new CloudStoragePlatformCollection(
      this.envConfig
    );

    this.cloudStorageDeviceDirLocationCollection = new CloudStorageDeviceDirLocationCollection(
      this.envConfig
    );

    this.deviceRootDirLocationCollection = new DeviceRootDirLocationCollection(
      this.envConfig
    );

    this.servicePlatformCollection = new ServicePlatformCollection(
      this.envConfig
    );

    this.servicePlatformUserAccountCollection = new ServicePlatformUserAccountCollection(
      this.envConfig
    );
  }

  public async assureUpToDate(): Promise<void> {
    await assureUpToDate(this.metadataCollection, REQUIRED_VERSION_VALUE);
  }

  public async IsUpToDate(): Promise<boolean> {
    const result = await IsUpToDate(
      this.metadataCollection,
      REQUIRED_VERSION_VALUE
    );

    return result.isUpToDate;
  }
}
