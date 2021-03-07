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
    uuid: "8980b975-615d-4981-928a-3a297a18bb50",
    key: "google-drive",
    name: "Google Drive",
    description: "Google Drive cloud storage",
    servicePlatformKey: "google",
  },
  {
    uuid: "52a1f84d-7900-48a4-834e-799867afe8b8",
    key: "one-drive",
    name: "One Drive",
    description: "Microsoft's One Drive cloud storage",
    servicePlatformKey: "microsoft",
  },
  {
    uuid: "fa3622df-1444-4e01-b1fe-29664d5ff043",
    key: "dropbox",
    name: "Dropbox",
    description: "Dropbox cloud storage",
    servicePlatformKey: "dropbox",
  },
  {
    uuid: "61baf9f9-0355-47c8-a017-424333c7008d",
    key: "icloud",
    name: "iCloud",
    description: "Apple's iCloud storage service",
    servicePlatformKey: "icloud",
  },
];
