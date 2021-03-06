import { DataSourceBase } from "../../../src.common/data/json/data-collection.js";
import {
  ServicePlatform,
  ServicePlatformUserAccount,
  CloudStoragePlatform,
} from "./service-providers.schema.js";

import {
  DeviceDirLocationType,
  DeviceRootDirLocation,
  CloudStorageDeviceDirLocation,
} from "./device-dir-locations.schema.js";

import { EnvConfig } from "../../../src.common/appSettings/envConfig.js";

export class DataSource {
  public servicePlatforms: ServicePlatform[];
  public servicePlatformUserAccounts: ServicePlatformUserAccount[];
  public cloudStoragePlatforms: CloudStoragePlatform[];
  public deviceDirLocationTypes: DeviceDirLocationType[];
  public deviceRootDirLocations: DeviceRootDirLocation[];
  public cloudStorageDeviceDirLocations: CloudStorageDeviceDirLocation[];

  constructor(envConfig: EnvConfig) {
    this.servicePlatforms = [];
    this.servicePlatformUserAccounts = [];
    this.cloudStoragePlatforms = [];
    this.deviceDirLocationTypes = [];
    this.deviceRootDirLocations = [];
    this.cloudStorageDeviceDirLocations = [];
  }

  getDataDirRelPath(): string {
    const dataDirRelPath = "./app-data";
    return dataDirRelPath;
  }
}
