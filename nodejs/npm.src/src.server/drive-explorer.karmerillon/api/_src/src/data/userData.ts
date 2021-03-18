import { ServicePlatformUserAccount } from "./schema/service-providers.schema.js";

import {
  DeviceRootDirLocation,
  CloudStorageDeviceDirLocation,
} from "./schema/device-dir-locations.schema.js";

/*
  uuid: string;
  key: string;
  servicePlatformAccountKey: string; // e.g. google
  cloudStoragePlatformKey: string; // e.g. dropbox / google-drive
  deviceLocationKey: string; // e.g. dropbox/dan.tincu@gmail.com / google-drive/dan.tincu@gmail.com
*/
export const cloudStorageDeviceDirLocations: CloudStorageDeviceDirLocation[] = [];

/*
  uuid: string;
  key: string;
  name: string;
  description: string;
  absPath: string;
  isDefault: boolean;
  locationTypeKey: string;
*/
export const deviceRootDirLocations: DeviceRootDirLocation[] = [];

/*
  uuid: string;
  key: string;
  name: string;
  description: string;
  username: string;
  email: string;
  servicePlatformKey: string;
*/
export const servicePlatformUserAccounts: ServicePlatformUserAccount[] = [];
