import { CloudStoragePlatform } from "../schema/service-providers.schema.js";

/*
  uuid: string;
  key: string;
  name: string;
  description: string;
  servicePlatformKey: string;
*/
export const cloudStoragePlatforms: CloudStoragePlatform[] = [
  {
    key: "google-drive",
    name: "Google Drive",
    description: "Google Drive cloud storage",
    servicePlatformKey: "google",
  },
  {
    key: "one-drive",
    name: "One Drive",
    description: "Microsoft's One Drive cloud storage",
    servicePlatformKey: "microsoft",
  },
  {
    key: "dropbox",
    name: "Dropbox",
    description: "Dropbox cloud storage",
    servicePlatformKey: "dropbox",
  },
  {
    key: "icloud",
    name: "iCloud",
    description: "Apple's iCloud storage service",
    servicePlatformKey: "icloud",
  },
];
