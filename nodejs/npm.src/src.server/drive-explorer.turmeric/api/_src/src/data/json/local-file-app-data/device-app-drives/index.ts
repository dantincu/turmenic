import { EnvConfig } from "../../../../../src.node.common/appSettings/envConfig.js";

import {
  LocalFileCollectionBase,
  LocalFileDataSourceInfo,
  MetadataLocalFileCollectionBase,
} from "../../../../../src.node.common/data/json/local-file.js";

import {
  DataCollectionOptions,
  DataSourceMetadata,
} from "../../../../../src.node.common/data/json/data-collection.js";

import {
  AppDrive,
  AppSession,
} from "../../../../../src.node.common/app-data/device-app-drives/types.js";

export const deviceAppDrivesDataSourceInfo = Object.freeze({
  dataSourceName: "deviceAppDrives",
  dataSourceDirRelPath: "./device-app-drives",
} as LocalFileDataSourceInfo);

export class DeviceAppDrivesCollection<
  TData,
  TJsonData
> extends LocalFileCollectionBase<TData, TJsonData> {
  constructor(opts: DataCollectionOptions<TData, TJsonData>) {
    super(opts);
  }

  getDataDirRelPath(): string {
    const dataDirRelPath = deviceAppDrivesDataSourceInfo.dataSourceDirRelPath;
    return dataDirRelPath;
  }
}

const getDataCollectionOptions = <TData, TJsonData>(
  envConfig: EnvConfig,
  dataSourceName: string,
  dataCollectionName: string
) => {
  const opts = new DataCollectionOptions<TData, TJsonData>(
    envConfig,
    dataSourceName,
    dataCollectionName
  );

  opts.dataSaveOptions = {};

  return opts;
};

export class AppDriveCollection extends DeviceAppDrivesCollection<
  AppDrive,
  AppDrive
> {
  constructor(envConfig: EnvConfig) {
    super(
      getDataCollectionOptions<AppDrive, AppDrive>(
        envConfig,
        deviceAppDrivesDataSourceInfo.dataSourceName,
        AppDriveCollection.COLLECTION_NAME
      )
    );
  }

  static readonly COLLECTION_NAME = "allAppDrives";
}

export class AppSessionCollection extends DeviceAppDrivesCollection<
  AppSession,
  AppSession
> {
  constructor(envConfig: EnvConfig) {
    super(
      getDataCollectionOptions<AppSession, AppSession>(
        envConfig,
        deviceAppDrivesDataSourceInfo.dataSourceName,
        AppSessionCollection.COLLECTION_NAME
      )
    );
  }

  static readonly COLLECTION_NAME = "appSessions";
}

export class DeviceAppDrivesMetadataCollection extends MetadataLocalFileCollectionBase {
  constructor(envConfig: EnvConfig) {
    super(
      new DataCollectionOptions<DataSourceMetadata, DataSourceMetadata>(
        envConfig,
        deviceAppDrivesDataSourceInfo.dataSourceName,
        MetadataLocalFileCollectionBase.COLLECTION_NAME
      )
    );
  }

  getDataDirRelPath(): string {
    const dataDirRelPath = deviceAppDrivesDataSourceInfo.dataSourceDirRelPath;
    return dataDirRelPath;
  }
}
