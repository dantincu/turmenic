import {
  EnvConfig,
  envBaseDir,
} from "../../../../../src.common/appSettings/envConfig.js";

import {
  DataSourceUpdateOptions,
  DataSourceCollectionsUpdateBase,
  TypedDataCollectionUpdateBase,
} from "../../../../../src.common/data/json/update/index.js";

import {
  DataCollectionOptions,
  DataSourceMetadata,
  BLANK_VERSION_VALUE,
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

import {
  cloudStorageDeviceDirLocations,
  deviceRootDirLocations,
  servicePlatformUserAccounts,
} from "../../../userData.js";

import { cloudStoragePlatforms } from "../../../app-data/cloudStoragePlatforms.js";
import { deviceDirLocationTypes } from "../../../app-data/deviceDirLocationTypes";
import { servicePlatforms } from "../../../app-data/servicePlatforms.js";
import { env } from "node:process";

export class AppLocalFile_Init_To_V_0_0_1_CollectionsUpdate extends DataSourceCollectionsUpdateBase {
  public metadataCollectionUpdate: TypedDataCollectionUpdateBase<
    DataSourceMetadata,
    DataSourceMetadata,
    AppMetadataLocalFileCollection
  >;

  public cloudStorageDeviceDirLocationCollectionUpdate: TypedDataCollectionUpdateBase<
    CloudStorageDeviceDirLocation,
    CloudStorageDeviceDirLocation,
    CloudStorageDeviceDirLocationCollection
  >;

  public deviceDirLocationTypeCollectionUpdate: TypedDataCollectionUpdateBase<
    DeviceDirLocationType,
    DeviceDirLocationType,
    DeviceDirLocationTypeCollection
  >;

  public deviceRootDirLocationCollectionUpdate: TypedDataCollectionUpdateBase<
    DeviceRootDirLocation,
    DeviceRootDirLocation,
    DeviceRootDirLocationCollection
  >;

  public cloudStoragePlatformCollectionUpdate: TypedDataCollectionUpdateBase<
    CloudStoragePlatform,
    CloudStoragePlatform,
    CloudStoragePlatformCollection
  >;

  public servicePlatformCollectionUpdate: TypedDataCollectionUpdateBase<
    ServicePlatform,
    ServicePlatform,
    ServicePlatformCollection
  >;

  public servicePlatformUserAccountCollectionUpdate: TypedDataCollectionUpdateBase<
    ServicePlatformUserAccount,
    ServicePlatformUserAccount,
    ServicePlatformUserAccountCollection
  >;

  constructor(envConfig: EnvConfig) {
    super([]);

    this.metadataCollectionUpdate = new TypedDataCollectionUpdateBase<
      DataSourceMetadata,
      DataSourceMetadata,
      AppMetadataLocalFileCollection
    >(new AppMetadataLocalFileCollection(envConfig));
    this.collectionsList.push(this.metadataCollectionUpdate);

    this.cloudStorageDeviceDirLocationCollectionUpdate = new TypedDataCollectionUpdateBase<
      CloudStorageDeviceDirLocation,
      CloudStorageDeviceDirLocation,
      CloudStorageDeviceDirLocationCollection
    >(new CloudStorageDeviceDirLocationCollection(envConfig));
    this.collectionsList.push(
      this.cloudStorageDeviceDirLocationCollectionUpdate
    );

    this.deviceDirLocationTypeCollectionUpdate = new TypedDataCollectionUpdateBase<
      DeviceDirLocationType,
      DeviceDirLocationType,
      DeviceDirLocationTypeCollection
    >(new DeviceDirLocationTypeCollection(envConfig));
    this.collectionsList.push(this.deviceDirLocationTypeCollectionUpdate);

    this.deviceRootDirLocationCollectionUpdate = new TypedDataCollectionUpdateBase<
      DeviceRootDirLocation,
      DeviceRootDirLocation,
      DeviceRootDirLocationCollection
    >(new DeviceRootDirLocationCollection(envConfig));
    this.collectionsList.push(this.deviceRootDirLocationCollectionUpdate);

    this.cloudStoragePlatformCollectionUpdate = new TypedDataCollectionUpdateBase<
      CloudStoragePlatform,
      CloudStoragePlatform,
      CloudStoragePlatformCollection
    >(new CloudStoragePlatformCollection(envConfig));
    this.collectionsList.push(this.cloudStoragePlatformCollectionUpdate);

    this.servicePlatformCollectionUpdate = new TypedDataCollectionUpdateBase<
      ServicePlatform,
      ServicePlatform,
      ServicePlatformCollection
    >(new ServicePlatformCollection(envConfig));
    this.collectionsList.push(this.servicePlatformCollectionUpdate);

    this.servicePlatformUserAccountCollectionUpdate = new TypedDataCollectionUpdateBase<
      ServicePlatformUserAccount,
      ServicePlatformUserAccount,
      ServicePlatformUserAccountCollection
    >(new ServicePlatformUserAccountCollection(envConfig));
    this.collectionsList.push(this.servicePlatformUserAccountCollectionUpdate);
  }
}

export class AppLocalFile_Init_To_V_0_0_1_UpdateOptions extends DataSourceUpdateOptions<AppMetadataLocalFileCollection> {
  constructor(
    dataSource: AppLocalFileDataSource,
    metadataCollection: AppMetadataLocalFileCollection,
    requiredVersion: string
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
    requiredVersion: string
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

  getAllEngines<TCollectionsUpdate extends DataSourceCollectionsUpdateBase>(
    collectionsUpdate: TCollectionsUpdate
  ): UpdateEngineBase[] {
    const allEngines: UpdateEngineBase[] = [
      new AppLocalFile_Init_To_V_0_0_1_UpdateEngine(
        new AppLocalFile_Init_To_V_0_0_1_CollectionsUpdate(this.envConfig)
      ),
    ];

    return allEngines;
  }
}

export class AppLocalFile_Init_To_V_0_0_1_UpdateEngine extends TypedUpdateEngineBase<AppLocalFile_Init_To_V_0_0_1_CollectionsUpdate> {
  constructor(
    collectionsUpdate: AppLocalFile_Init_To_V_0_0_1_CollectionsUpdate
  ) {
    super(collectionsUpdate);
  }

  getFromVersion(): string {
    const fromVersion = BLANK_VERSION_VALUE;
    return fromVersion;
  }

  getToVersion(): string {
    const toVersion = "0.0.1";
    return toVersion;
  }

  async run(): Promise<void> {
    this.dataSourceCollectionsUpdate.cloudStorageDeviceDirLocationCollectionUpdate.data = cloudStorageDeviceDirLocations;
    this.dataSourceCollectionsUpdate.deviceRootDirLocationCollectionUpdate.data = deviceRootDirLocations;
    this.dataSourceCollectionsUpdate.servicePlatformUserAccountCollectionUpdate.data = servicePlatformUserAccounts;
    this.dataSourceCollectionsUpdate.cloudStoragePlatformCollectionUpdate.data = cloudStoragePlatforms;
    this.dataSourceCollectionsUpdate.deviceDirLocationTypeCollectionUpdate.data = deviceDirLocationTypes;
    this.dataSourceCollectionsUpdate.servicePlatformCollectionUpdate.data = servicePlatforms;

    this.dataSourceCollectionsUpdate.metadataCollectionUpdate.data = [
      <DataSourceMetadata>{
        dataSourceVersion: this.toVersion,
      },
    ];
  }
}
