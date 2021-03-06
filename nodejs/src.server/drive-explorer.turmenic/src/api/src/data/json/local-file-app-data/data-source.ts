import {
  DataCollectionOptions,
  DataSourceMetadata,
} from "../../../../src.common/data/json/data-collection.js";

import {
  LocalFileCollectionBase,
  LocalFileDataSourceBase,
  LocalFileDataSourceOptions,
} from "../../../../src.common/data/json/local-file.js";

import {
  AppLocalFileCollection,
  DeviceDirLocationTypeCollection,
  DATA_SOURCE_NAME,
  DATA_SOURCE_DIR_REL_PATH,
  CloudStoragePlatformCollection,
  CloudStorageDeviceDirLocationCollection,
  DeviceRootDirLocationCollection,
  ServicePlatformCollection,
  ServicePlatformUserAccountCollection,
  AppMetadataLocalFileCollection,
} from "./index.js";

export class AppLocalFileDataSource extends LocalFileDataSourceBase {
  public readonly deviceDirLocationTypeCollection: DeviceDirLocationTypeCollection;
  public readonly cloudStoragePlatformCollection: CloudStoragePlatformCollection;
  public readonly cloudStorageDeviceDirLocationCollection: CloudStorageDeviceDirLocationCollection;
  public readonly deviceRootDirLocationCollection: DeviceRootDirLocationCollection;
  public readonly servicePlatformCollection: ServicePlatformCollection;
  public readonly servicePlatformUserAccountCollection: ServicePlatformUserAccountCollection;

  constructor(opts: LocalFileDataSourceOptions) {
    super(opts);

    this.deviceDirLocationTypeCollection = new DeviceDirLocationTypeCollection(
      opts.envConfig
    );

    this.cloudStoragePlatformCollection = new CloudStoragePlatformCollection(
      opts.envConfig
    );

    this.cloudStorageDeviceDirLocationCollection = new CloudStorageDeviceDirLocationCollection(
      opts.envConfig
    );

    this.deviceRootDirLocationCollection = new DeviceRootDirLocationCollection(
      opts.envConfig
    );

    this.servicePlatformCollection = new ServicePlatformCollection(
      opts.envConfig
    );

    this.servicePlatformUserAccountCollection = new ServicePlatformUserAccountCollection(
      opts.envConfig
    );
  }
}
