import { ServicePlatform } from "../schema/service-providers.schema.js";

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
    uuid: "0ba14996-d3bb-4b1c-b61a-910458118158",
    key: "google",
    name: "Google",
    description:
      "Google accounts are being used to access Google services like Gmail, Google Drive, Google Docs, Youtube etc.",
    hasOwnMailbox: true,
    hasCloudStorage: true,
    mainDomain: "google.com",
  },
  {
    uuid: "26bcf9ee-ad43-45df-8e03-254bb35085e4",
    key: "microsoft",
    name: "Microsoft",
    description:
      "Microsoft accounts are being used to access Microsoft services like Outlook mailbox, One Drive, Office 365 etc.",
    hasOwnMailbox: true,
    hasCloudStorage: true,
    mainDomain: "microsoft.com",
  },
  {
    uuid: "ceda7f79-bd78-4504-b488-15748ef180d7",
    key: "icloud",
    name: "iCloud",
    description:
      "Apple account ids are being used for Apple products like iOS devices, or to access services like iCloud Drive, iCloud Mail etc.",
    hasOwnMailbox: true,
    hasCloudStorage: true,
    mainDomain: "icloud.com",
  },
  {
    uuid: "e72acfa9-b391-4cef-88e0-fe0ce8f3abde",
    key: "dropbox",
    name: "Dropbox",
    description:
      "Dropbox accounts are being to access Dropbox's cloud storage service",
    hasOwnMailbox: false,
    hasCloudStorage: true,
    mainDomain: "yahoo.com",
  },
  {
    uuid: "a8442825-52c4-400b-98c8-d401d6a1cf64",
    key: "yahoo",
    name: "Yahoo",
    description:
      "Yahoo accounts are being to access Yahoo services like Yahoo Mail etc.",
    hasOwnMailbox: true,
    hasCloudStorage: false,
    mainDomain: "yahoo.com",
  },
  {
    uuid: "41774abe-fb8b-4b5b-8be0-daf3ac1b66b4",
    key: "facebook",
    name: "Facebook",
    description:
      "Facebook account is being used to access facebook.com (and the Facebook Android app) and other Facebook-owned services like Instagram etc.",
    hasOwnMailbox: false,
    hasCloudStorage: false,
    mainDomain: "facebook.com",
  },
];
