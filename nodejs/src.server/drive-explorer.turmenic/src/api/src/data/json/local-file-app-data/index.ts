import {
  EnvConfig,
  envBaseDir,
} from "../../../../src.common/appSettings/envConfig.js";

import {
  DataCollectionOptions,
  DataSourceMetadata,
} from "../../../../src.common/data/json/data-collection.js";

import {
  LocalFileCollectionBase,
  LocalFileDataSourceBase,
  LocalFileDataSourceOptions,
  MetadataLocalFileCollectionBase,
} from "../../../../src.common/data/json/local-file.js";

import {
  CloudStorageDeviceDirLocation,
  DeviceDirLocationType,
  DeviceRootDirLocation,
} from "../../schema/device-dir-locations.schema.js";

import {
  CloudStoragePlatform,
  ServicePlatform,
  ServicePlatformUserAccount,
} from "../../schema/service-providers.schema.js";

export const DATA_SOURCE_DIR_REL_PATH = "./app-data";
export const DATA_SOURCE_NAME = "localFileAppData";

export class AppLocalFileCollection<
  TData,
  TJsonData
> extends LocalFileCollectionBase<TData, TJsonData> {
  constructor(opts: DataCollectionOptions<TData, TJsonData>) {
    super(opts);
  }

  getDataDirRelPath(): string {
    const dataDirRelPath = DATA_SOURCE_DIR_REL_PATH;
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
      >(envConfig, DATA_SOURCE_NAME, DATA_SOURCE_DIR_REL_PATH)
    );
  }
}

export class DeviceDirLocationTypeCollection extends AppLocalFileCollection<
  DeviceDirLocationType,
  DeviceDirLocationType
> {
  constructor(envConfig: EnvConfig) {
    super(
      new DataCollectionOptions<DeviceDirLocationType, DeviceDirLocationType>(
        envConfig,
        DATA_SOURCE_NAME,
        DATA_SOURCE_DIR_REL_PATH
      )
    );
  }
}

export class DeviceRootDirLocationCollection extends AppLocalFileCollection<
  DeviceRootDirLocation,
  DeviceRootDirLocation
> {
  constructor(envConfig: EnvConfig) {
    super(
      new DataCollectionOptions<DeviceRootDirLocation, DeviceRootDirLocation>(
        envConfig,
        DATA_SOURCE_NAME,
        DATA_SOURCE_DIR_REL_PATH
      )
    );
  }
}

export class CloudStoragePlatformCollection extends AppLocalFileCollection<
  CloudStoragePlatform,
  CloudStoragePlatform
> {
  constructor(envConfig: EnvConfig) {
    super(
      new DataCollectionOptions<CloudStoragePlatform, CloudStoragePlatform>(
        envConfig,
        DATA_SOURCE_NAME,
        DATA_SOURCE_DIR_REL_PATH
      )
    );
  }
}

export class ServicePlatformCollection extends AppLocalFileCollection<
  ServicePlatform,
  ServicePlatform
> {
  constructor(envConfig: EnvConfig) {
    super(
      new DataCollectionOptions<ServicePlatform, ServicePlatform>(
        envConfig,
        DATA_SOURCE_NAME,
        DATA_SOURCE_DIR_REL_PATH
      )
    );
  }
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
      >(envConfig, DATA_SOURCE_NAME, DATA_SOURCE_DIR_REL_PATH)
    );
  }
}

export class AppMetadataLocalFileCollection extends MetadataLocalFileCollectionBase {
  constructor(envConfig: EnvConfig) {
    super(
      new DataCollectionOptions<DataSourceMetadata, DataSourceMetadata>(
        envConfig,
        DATA_SOURCE_NAME,
        DATA_SOURCE_DIR_REL_PATH
      )
    );
  }

  getDataDirRelPath(): string {
    const dataDirRelPath = DATA_SOURCE_DIR_REL_PATH;
    return dataDirRelPath;
  }
}
