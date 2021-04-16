import {
  EnvConfig,
  envBaseDir,
} from "../../../../../src.node.common/appSettings/envConfig.js";

import {
  DataCollectionOptions,
  DataSourceMetadata,
  AbstractDataCollection,
} from "../../../../../src.node.common/data/json/data-collection.js";

import { assureUpToDate } from "../../../../../src.node.common/data/json/data-source.js";

import {
  LocalFileCollectionBase,
  LocalFileDataSourceBase,
  LocalFileDataSourceOptions,
  MetadataLocalFileCollectionBase,
} from "../../../../../src.node.common/data/json/local-file.js";

import {
  AppDrive,
  AppSession,
  DriveFile,
  DriveFolder,
  DriveItem,
  FolderNode,
  DeviceAppDriveSessions,
} from "../../../../../src.node.common/app-data/device-app-drives/types";

import { appLocalFileDataSourceInfo } from "../local-file-app-data.js";
import {
  deviceAppDrivesDataSourceInfo,
  AppDriveCollection,
  AppSessionCollection,
  DeviceAppDrivesCollection,
  DeviceAppDrivesMetadataCollection,
} from "./device-app-drives.js";
import { GenericHash } from "../../../../../src.common/utils/types.js";

export class DeviceAppDrivesDataSourceOptions extends LocalFileDataSourceOptions<DeviceAppDrivesMetadataCollection> {
  constructor(
    envConfig: EnvConfig,
    metadataCollection: DeviceAppDrivesMetadataCollection
  ) {
    super(
      envConfig,
      deviceAppDrivesDataSourceInfo.dataSourceName,
      metadataCollection,
      deviceAppDrivesDataSourceInfo.dataSourceDirRelPath
    );
  }
}

export class DeviceAppDrivesDataSource extends LocalFileDataSourceBase<DeviceAppDrivesMetadataCollection> {
  public readonly allAppDrivesCollection: AppDriveCollection;
  public readonly appSessionsCollection: AppSessionCollection;

  constructor(envConfig: EnvConfig) {
    super(
      new DeviceAppDrivesDataSourceOptions(
        envConfig,
        new DeviceAppDrivesMetadataCollection(envConfig)
      )
    );

    this.allAppDrivesCollection = new AppDriveCollection(this.envConfig);
    this.appSessionsCollection = new AppSessionCollection(this.envConfig);

    this.addDataCollections();
  }

  public async assureUpToDate(): Promise<void> {
    await assureUpToDate(
      this.metadataCollection,
      appLocalFileDataSourceInfo.requiredVersion
    );
  }

  addDataCollection<TData, TJsonData>(
    collection: DeviceAppDrivesCollection<TData, TJsonData>
  ) {
    this.addCollection<
      TData,
      TJsonData,
      DeviceAppDrivesCollection<TData, TJsonData>
    >(collection);
  }

  addDataCollections() {
    this.addDataCollection(this.metadataCollection);
    this.addDataCollection(this.allAppDrivesCollection);
    this.addDataCollection(this.appSessionsCollection);
  }
}
