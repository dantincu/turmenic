import { GenericHash } from "../../../../src.common/utils/types";
import { EnvConfig } from "../../../../src.node.common/appSettings/envConfig";

import {
  DataCollectionOptions,
  DataSourceMetadata,
  DataCollectionBase,
  AbstractDataCollection,
} from "../../../../src.node.common/data/json/data-collection.js";

import { assureUpToDate } from "../../../../src.node.common/data/json/data-source.js";

import {
  LocalFileCollectionBase,
  LocalFileDataSourceBase,
  LocalFileDataSourceOptions,
} from "../../../../src.node.common/data/json/local-file.js";

import {
  AppLocalFileCollection,
  DeviceDirLocationTypeCollection,
  CloudStoragePlatformCollection,
  CloudStorageDeviceDirLocationCollection,
  DeviceRootDirLocationCollection,
  ServicePlatformCollection,
  ServicePlatformUserAccountCollection,
  AppMetadataLocalFileCollection,
  appLocalFileDataSourceInfo,
} from "./index.js";

import {
  CloudStoragePlatform,
  ServicePlatform,
  ServicePlatformUserAccount,
} from "../../../../src.node.common/app-data/schema/service-providers.schema.js";

import {
  CloudStorageDeviceDirLocation,
  DeviceDirLocationType,
  DeviceRootDirLocation,
} from "../../../../src.node.common/app-data/schema/device-dir-locations.schema";

export class AppLocalFileDataSourceOptions extends LocalFileDataSourceOptions<AppMetadataLocalFileCollection> {
  constructor(
    envConfig: EnvConfig,
    metadataCollection: AppMetadataLocalFileCollection
  ) {
    super(
      envConfig,
      appLocalFileDataSourceInfo.dataSourceName,
      metadataCollection,
      appLocalFileDataSourceInfo.dataSourceDirRelPath
    );
  }
}

export class AppLocalFileDataSource extends LocalFileDataSourceBase<AppMetadataLocalFileCollection> {
  public readonly deviceDirLocationTypeCollection: DeviceDirLocationTypeCollection;
  public readonly cloudStoragePlatformCollection: CloudStoragePlatformCollection;
  public readonly cloudStorageDeviceDirLocationCollection: CloudStorageDeviceDirLocationCollection;
  public readonly deviceRootDirLocationCollection: DeviceRootDirLocationCollection;
  public readonly servicePlatformCollection: ServicePlatformCollection;
  public readonly servicePlatformUserAccountCollection: ServicePlatformUserAccountCollection;

  constructor(envConfig: EnvConfig) {
    super(
      new AppLocalFileDataSourceOptions(
        envConfig,
        new AppMetadataLocalFileCollection(envConfig)
      )
    );

    this.deviceDirLocationTypeCollection = new DeviceDirLocationTypeCollection(
      envConfig
    );

    this.cloudStoragePlatformCollection = new CloudStoragePlatformCollection(
      envConfig
    );

    this.cloudStorageDeviceDirLocationCollection = new CloudStorageDeviceDirLocationCollection(
      envConfig
    );

    this.deviceRootDirLocationCollection = new DeviceRootDirLocationCollection(
      envConfig
    );

    this.servicePlatformCollection = new ServicePlatformCollection(envConfig);

    this.servicePlatformUserAccountCollection = new ServicePlatformUserAccountCollection(
      envConfig
    );

    this.deviceDirLocationTypeCollection = new DeviceDirLocationTypeCollection(
      envConfig
    );

    this.addDataCollections();
  }

  public async assureUpToDate(): Promise<void> {
    await assureUpToDate(
      this.metadataCollection,
      appLocalFileDataSourceInfo.requiredVersion
    );
  }

  addDataCollection<TData, TJsonData>(
    collection: AppLocalFileCollection<TData, TJsonData>
  ) {
    this.addCollection<
      TData,
      TJsonData,
      AppLocalFileCollection<TData, TJsonData>
    >(collection);
  }

  addDataCollections() {
    this.addDataCollection(this.metadataCollection);
    this.addDataCollection(this.deviceDirLocationTypeCollection);
    this.addDataCollection(this.cloudStoragePlatformCollection);
    this.addDataCollection(this.cloudStorageDeviceDirLocationCollection);
    this.addDataCollection(this.deviceRootDirLocationCollection);
    this.addDataCollection(this.servicePlatformCollection);
    this.addDataCollection(this.servicePlatformUserAccountCollection);
  }
}
