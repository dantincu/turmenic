import { ServicePlatform } from "../../../src.node.common/app-data/schema/service-providers.schema.js";

export const servicePlatformKeys = {
  google: "google",
  microsoft: "microsoft",
  dropbox: "dropbox",
  icloud: "icloud",
  yahoo: "yahoo",
  facebook: "facebook",
};

/*
  uuid: string; // Guid generated with powershell
  key: string; // unique short & rememberable string identifier
  name: string; // Display name
  description: string; // Informative description
  hasOwnMailbox: boolean; // false for Facebook & Dropbox, the rest of service platforms listed here all offer mailboxes
  hasCloudStorage: boolean; // false for Yahoo, Facebook & Vivaldi Browser & Mail.
  mainDomain: string; // google.com for Google, microsoft.com for Microsoft etc
*/
export const servicePlatforms: ServicePlatform[] = [
  {
    key: servicePlatformKeys.google,
    name: "Google",
    description:
      "Google accounts are being used to access Google services like Gmail, Google Drive, Google Docs, Youtube etc.",
    hasOwnMailbox: true,
    hasCloudStorage: true,
    mainDomain: "google.com",
  },
  {
    key: servicePlatformKeys.microsoft,
    name: "Microsoft",
    description:
      "Microsoft accounts are being used to access Microsoft services like Outlook mailbox, One Drive, Office 365 etc.",
    hasOwnMailbox: true,
    hasCloudStorage: true,
    mainDomain: "microsoft.com",
  },
  {
    key: servicePlatformKeys.icloud,
    name: "iCloud",
    description:
      "Apple account ids are being used for Apple products like iOS devices, or to access services like iCloud Drive, iCloud Mail etc.",
    hasOwnMailbox: true,
    hasCloudStorage: true,
    mainDomain: "icloud.com",
  },
  {
    key: servicePlatformKeys.dropbox,
    name: "Dropbox",
    description:
      "Dropbox accounts are being to access Dropbox's cloud storage service",
    hasOwnMailbox: false,
    hasCloudStorage: true,
    mainDomain: "yahoo.com",
  },
  {
    key: servicePlatformKeys.yahoo,
    name: "Yahoo",
    description:
      "Yahoo accounts are being to access Yahoo services like Yahoo Mail etc.",
    hasOwnMailbox: true,
    hasCloudStorage: false,
    mainDomain: "yahoo.com",
  },
  {
    key: servicePlatformKeys.facebook,
    name: "Facebook",
    description:
      "Facebook account is being used to access facebook.com (and the Facebook Android app) and other Facebook-owned services like Instagram etc.",
    hasOwnMailbox: false,
    hasCloudStorage: false,
    mainDomain: "facebook.com",
  },
];
