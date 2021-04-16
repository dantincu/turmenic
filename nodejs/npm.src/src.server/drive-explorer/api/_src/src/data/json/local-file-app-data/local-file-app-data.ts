import {
  EnvConfig,
  envBaseDir,
} from "../../../../src.node.common/appSettings/envConfig.js";

import {
  DataCollectionOptions,
  DataSourceMetadata,
} from "../../../../src.node.common/data/json/data-collection.js";

import {
  LocalFileCollectionBase,
  LocalFileDataSourceBase,
  LocalFileDataSourceOptions,
  MetadataLocalFileCollectionBase,
  VersionedLocalFileDataSourceInfo,
} from "../../../../src.node.common/data/json/local-file.js";

import {
  CloudStorageDeviceDirLocation,
  DeviceDirLocationType,
  DeviceRootDirLocation,
} from "../../../../src.node.common/app-data/schema/device-dir-locations.schema.js";

import {
  CloudStoragePlatform,
  ServicePlatform,
  ServicePlatformUserAccount,
} from "../../../../src.node.common/app-data/schema/service-providers.schema.js";

export const appLocalFileDataSourceInfo = Object.freeze({
  dataSourceName: "localFileAppData",
  requiredVersion: "0.1.0",
  dataSourceDirRelPath: "./app-data",
} as VersionedLocalFileDataSourceInfo);

export class AppLocalFileCollection<
  TData,
  TJsonData
> extends LocalFileCollectionBase<TData, TJsonData> {
  constructor(opts: DataCollectionOptions<TData, TJsonData>) {
    super(opts);
  }

  getDataDirRelPath(): string {
    const dataDirRelPath = appLocalFileDataSourceInfo.dataSourceDirRelPath;
    return dataDirRelPath;
  }
}

export class CloudStorageDeviceDirLocationCollection extends AppLocalFileCollection<
  CloudStorageDeviceDirLocation,
  CloudStorageDeviceDirLocation
> {
  constructor(envConfig: EnvConfig) {
    super(
      new DataCollectionOptions<
        CloudStorageDeviceDirLocation,
        CloudStorageDeviceDirLocation
      >(
        envConfig,
        appLocalFileDataSourceInfo.dataSourceName,
        CloudStorageDeviceDirLocationCollection.COLLECTION_NAME
      )
    );
  }

  static readonly COLLECTION_NAME = "cloudStorageDeviceDirLocations";
}

export class DeviceDirLocationTypeCollection extends AppLocalFileCollection<
  DeviceDirLocationType,
  DeviceDirLocationType
> {
  constructor(envConfig: EnvConfig) {
    super(
      new DataCollectionOptions<DeviceDirLocationType, DeviceDirLocationType>(
        envConfig,
        appLocalFileDataSourceInfo.dataSourceName,
        DeviceDirLocationTypeCollection.COLLECTION_NAME
      )
    );
  }

  static readonly COLLECTION_NAME = "deviceDirLocationTypes";
}

export class DeviceRootDirLocationCollection extends AppLocalFileCollection<
  DeviceRootDirLocation,
  DeviceRootDirLocation
> {
  constructor(envConfig: EnvConfig) {
    super(
      new DataCollectionOptions<DeviceRootDirLocation, DeviceRootDirLocation>(
        envConfig,
        appLocalFileDataSourceInfo.dataSourceName,
        DeviceRootDirLocationCollection.COLLECTION_NAME
      )
    );
  }

  static readonly COLLECTION_NAME = "deviceRootDirLocations";
}

export class CloudStoragePlatformCollection extends AppLocalFileCollection<
  CloudStoragePlatform,
  CloudStoragePlatform
> {
  constructor(envConfig: EnvConfig) {
    super(
      new DataCollectionOptions<CloudStoragePlatform, CloudStoragePlatform>(
        envConfig,
        appLocalFileDataSourceInfo.dataSourceName,
        CloudStoragePlatformCollection.COLLECTION_NAME
      )
    );
  }

  static readonly COLLECTION_NAME = "cloudStoragePlatforms";
}

export class ServicePlatformCollection extends AppLocalFileCollection<
  ServicePlatform,
  ServicePlatform
> {
  constructor(envConfig: EnvConfig) {
    super(
      new DataCollectionOptions<ServicePlatform, ServicePlatform>(
        envConfig,
        appLocalFileDataSourceInfo.dataSourceName,
        ServicePlatformCollection.COLLECTION_NAME
      )
    );
  }

  static readonly COLLECTION_NAME = "servicePlatforms";
}

export class ServicePlatformUserAccountCollection extends AppLocalFileCollection<
  ServicePlatformUserAccount,
  ServicePlatformUserAccount
> {
  constructor(envConfig: EnvConfig) {
    super(
      new DataCollectionOptions<
        ServicePlatformUserAccount,
        ServicePlatformUserAccount
      >(
        envConfig,
        appLocalFileDataSourceInfo.dataSourceName,
        ServicePlatformUserAccountCollection.COLLECTION_NAME
      )
    );
  }

  static readonly COLLECTION_NAME = "servicePlatformUserAccounts";
}

export class AppMetadataLocalFileCollection extends MetadataLocalFileCollectionBase {
  constructor(envConfig: EnvConfig) {
    super(
      new DataCollectionOptions<DataSourceMetadata, DataSourceMetadata>(
        envConfig,
        appLocalFileDataSourceInfo.dataSourceName,
        MetadataLocalFileCollectionBase.COLLECTION_NAME
      )
    );
  }

  getDataDirRelPath(): string {
    const dataDirRelPath = appLocalFileDataSourceInfo.dataSourceDirRelPath;
    return dataDirRelPath;
  }
}
