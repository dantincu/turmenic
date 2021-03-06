import {
  EnvConfig,
  envBaseDir,
} from "../../../../../src.common/appSettings/envConfig.js";

import {
  DataSourceUpdateResult,
  DataSourceUpdateOptions,
  BLANK_VERSION_VALUE,
  DataSourceUpdateErrorType,
  DataCollectionUpdateBase,
  DataSourceCollectionsUpdateBase,
  TypedDataCollectionUpdateBase,
} from "../../../../../src.common/data/json/update/index.js";

import {
  DataCollectionOptions,
  DataSourceMetadata,
} from "../../../../../src.common/data/json/data-collection.js";

import { LocalFileDataSourceUpdateBase } from "../../../../../src.common/data/json/update/local-file.js";
import { TypedUpdateEngineBase } from "../../../../../src.common/data/json/update/engine.js";
import { UpdateEngineBase } from "../../../../../src.common/data/json/update/engine.js";
import { AppLocalFileDataSource } from "../../local-file-app-data/data-source.js";

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

import {
  CloudStorageDeviceDirLocation,
  DeviceDirLocationType,
  DeviceRootDirLocation,
} from "../../../schema/device-dir-locations.schema.js";

import {
  CloudStoragePlatform,
  ServicePlatform,
  ServicePlatformUserAccount,
} from "../../../schema/service-providers.schema.js";

const getDataCollectionUpdateList = (
  envConfig: EnvConfig
): DataCollectionUpdateBase[] => {
  const dataCollectionUpdatesList: DataCollectionUpdateBase[] = [
    new TypedDataCollectionUpdateBase<
      DataSourceMetadata,
      DataSourceMetadata,
      AppMetadataLocalFileCollection
    >(new AppMetadataLocalFileCollection(envConfig)),

    new TypedDataCollectionUpdateBase<
      CloudStorageDeviceDirLocation,
      CloudStorageDeviceDirLocation,
      CloudStorageDeviceDirLocationCollection
    >(new CloudStorageDeviceDirLocationCollection(envConfig)),

    new TypedDataCollectionUpdateBase<
      DeviceDirLocationType,
      DeviceDirLocationType,
      DeviceDirLocationTypeCollection
    >(new DeviceDirLocationTypeCollection(envConfig)),

    new TypedDataCollectionUpdateBase<
      DeviceRootDirLocation,
      DeviceRootDirLocation,
      DeviceRootDirLocationCollection
    >(new DeviceRootDirLocationCollection(envConfig)),

    new TypedDataCollectionUpdateBase<
      CloudStoragePlatform,
      CloudStoragePlatform,
      CloudStoragePlatformCollection
    >(new CloudStoragePlatformCollection(envConfig)),

    new TypedDataCollectionUpdateBase<
      ServicePlatform,
      ServicePlatform,
      ServicePlatformCollection
    >(new ServicePlatformCollection(envConfig)),

    new TypedDataCollectionUpdateBase<
      ServicePlatformUserAccount,
      ServicePlatformUserAccount,
      ServicePlatformUserAccountCollection
    >(new ServicePlatformUserAccountCollection(envConfig)),
  ];

  return dataCollectionUpdatesList;
};

export class AppLocalFile_Init_To_V_0_0_1_CollectionsUpdate extends DataSourceCollectionsUpdateBase {
  constructor(envConfig: EnvConfig) {
    super(getDataCollectionUpdateList(envConfig));
  }
}

export class AppLocalFile_Init_To_V_0_0_1_UpdateOptions extends DataSourceUpdateOptions<AppMetadataLocalFileCollection> {
  constructor(
    dataSource: AppLocalFileDataSource,
    metadataCollection: AppMetadataLocalFileCollection,
    requiredVersion?: string
  ) {
    super(dataSource, metadataCollection, requiredVersion);
  }
}

export class AppLocalFile_Init_To_V_0_0_1_Update extends LocalFileDataSourceUpdateBase<
  AppLocalFileDataSource,
  AppMetadataLocalFileCollection
> {
  constructor(
    dataSource: AppLocalFileDataSource,
    metadataCollection: AppMetadataLocalFileCollection,
    requiredVersion?: string
  ) {
    super(
      new AppLocalFile_Init_To_V_0_0_1_UpdateOptions(
        dataSource,
        metadataCollection,
        requiredVersion
      )
    );
  }

  getCollectionsUpdate(): AppLocalFile_Init_To_V_0_0_1_CollectionsUpdate {
    const collectionsUpdate = new AppLocalFile_Init_To_V_0_0_1_CollectionsUpdate(
      this.envConfig
    );
    return collectionsUpdate;
  }

  getAllEngines<
    TCollectionsUpdate extends AppLocalFile_Init_To_V_0_0_1_CollectionsUpdate
  >(collectionsUpdate: TCollectionsUpdate): UpdateEngineBase[] {
    throw new Error("Method not implemented.");
  }
}

export class AppLocalFile_Init_To_V_0_0_1_UpdateEngine extends TypedUpdateEngineBase<AppLocalFile_Init_To_V_0_0_1_CollectionsUpdate> {
  getFromVersion(): string {
    const fromVersion = BLANK_VERSION_VALUE;
    return fromVersion;
  }
  getToVersion(): string {
    const toVersion = "0.0.1";
    return toVersion;
  }
  run(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
