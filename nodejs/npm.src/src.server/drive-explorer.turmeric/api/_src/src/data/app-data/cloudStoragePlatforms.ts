import { CloudStoragePlatform } from "../../../src.node.common/app-data/schema/service-providers.schema.js";
import { servicePlatformKeys } from "./servicePlatforms.js";

export const cloudStoragePlatformKeys = {
  googleDrive: "google-drive",
  oneDrive: "one-drive",
  dropbox: "dropbox",
  icloud: "icloud",
};

/*
  uuid: string;
  key: string;
  name: string;
  description: string;
  servicePlatformKey: string;
*/
export const cloudStoragePlatforms: CloudStoragePlatform[] = [
  {
    key: cloudStoragePlatformKeys.googleDrive,
    name: "Google Drive",
    description: "Google Drive cloud storage",
    servicePlatformKey: servicePlatformKeys.google,
  },
  {
    key: cloudStoragePlatformKeys.oneDrive,
    name: "One Drive",
    description: "Microsoft's One Drive cloud storage",
    servicePlatformKey: servicePlatformKeys.microsoft,
  },
  {
    key: cloudStoragePlatformKeys.dropbox,
    name: "Dropbox",
    description: "Dropbox cloud storage",
    servicePlatformKey: servicePlatformKeys.dropbox,
  },
  {
    key: cloudStoragePlatformKeys.icloud,
    name: "iCloud",
    description: "Apple's iCloud storage service",
    servicePlatformKey: servicePlatformKeys.icloud,
  },
];
