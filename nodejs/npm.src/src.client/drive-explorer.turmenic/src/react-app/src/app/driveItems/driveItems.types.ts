export interface DriveItem {
  uuidB64: string;
  name: string;
  displayName?: string;
  parentFolderUuidB64?: string;
  path?: string;
  orderIdx?: number;
}

export interface DriveFolder extends DriveItem {
  files: DriveFile[];
  collapsed?: boolean;
  isRoot?: boolean;
  subFolders?: DriveFolder[];
  children?: DriveItem[];
}

export interface DriveFile extends DriveItem {
  nameWithoutExtension: string;
  extension?: string;
}

export interface AppDrive {
  rootFolder: DriveFolder;
}

export interface AppSessionDrives {
  appDrives: AppDrive[];
  allFolders: DriveFolder[];
}

export interface DeviceAppDrives {
  allAppDrives: AppDrive[];
  appSessionDrives: AppSessionDrives;
}

export const isFolder = (driveItem: DriveItem): boolean | null => {
  let retVal: boolean | null = null;

  if (typeof (<DriveFolder>driveItem).files === "object") {
    retVal = true;
  } else if (typeof (<DriveFile>driveItem).nameWithoutExtension === "string") {
    retVal = false;
  }

  return retVal;
};

export const isFile = (driveItem: DriveItem): boolean | null => {
  let retVal: boolean | null = null;

  if (typeof (<DriveFolder>driveItem).files === "object") {
    retVal = false;
  } else if (typeof (<DriveFile>driveItem).nameWithoutExtension === "string") {
    retVal = true;
  }

  return retVal;
};

export const asFolderOrNull = (driveItem: DriveItem): DriveFolder | null => {
  let driveFolder: DriveFolder | null = null;

  if (isFolder(driveItem)) {
    driveFolder = driveItem as DriveFolder;
  }

  return driveFolder;
};

export const assureIsFolder = (driveItem: DriveItem): DriveFolder => {
  const driveFolder = driveItem as DriveFolder;

  if (typeof driveFolder.files === "undefined" || driveFolder.files == null) {
    driveFolder.files = [];
  }

  return driveFolder;
};
