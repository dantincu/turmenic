export interface DeviceDirLocationType {
  uuid?: string;
  key: string;
  name: string;
  description: string;
}

export interface DeviceRootDirLocation {
  uuid?: string;
  key: string;
  name: string;
  description: string;
  absPath: string;
  isDefault: boolean;
  locationTypeKey: string;
}

export interface CloudStorageDeviceDirLocation {
  uuid?: string;
  key: string;
  servicePlatformAccountKey: string; // e.g. google
  cloudStoragePlatformKey: string; // e.g. dropbox / google-drive
  deviceLocationKey: string; // e.g. dropbox/dan.tincu@gmail.com / google-drive/dan.tincu@gmail.com
}
