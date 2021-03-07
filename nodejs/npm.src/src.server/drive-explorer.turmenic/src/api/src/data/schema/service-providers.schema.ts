export interface ServicePlatform {
  uuid: string; // Guid generated with powershell
  key: string; // unique short & rememberable string identifier
  name: string; // Display name
  description: string; // Informative description
  hasOwnMailbox: boolean; // false for Facebook & Dropbox, the rest of service platforms listed here all offer mailboxes
  hasCloudStorage: boolean; // false for Yahoo, Facebook & Vivaldi Browser & Mail.
  mainDomain: string; // google.com for Google, microsoft.com for Microsoft etc
}

export interface ServicePlatformUserAccount {
  uuid: string;
  key: string;
  name: string;
  description: string;
  username: string;
  email: string;
  servicePlatformKey: string;
}

export interface CloudStoragePlatform {
  uuid: string;
  key: string;
  name: string;
  description: string;
  servicePlatformKey: string;
}
