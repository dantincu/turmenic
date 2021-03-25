export interface DriveItem {
  id: number;
  name: string;
  parentFolderId?: number;
  path?: string;
  orderIdx?: number;
  isSelected?: boolean;
  isCurrent?: boolean;
  itemIsFolder?: boolean;
}

export interface DriveFolder extends DriveItem {
  files?: DriveFile[];
  expanded?: boolean;
  isRoot?: boolean;
  subFolders?: DriveFolder[];
}

export interface DriveFile extends DriveItem {
  nameWithoutExtension: string;
  extension?: string;
}

export interface DriveNode {
  itemId: number;
  itemIsFolder?: boolean;
}

export interface DriveFileNode extends DriveNode {}

export interface DriveFolderNode extends DriveNode {
  fileNodes?: DriveFileNode[];
  subFolderNodes?: DriveFolderNode[];
}

export interface AppDrive {
  uuidB64: string;
  label: string;

  rootFolder: DriveFolder;
  rootFolderNode: DriveFolderNode;
}

export interface AppSessionDrives {
  appDrives: AppDrive[];
  allFolders: DriveFolder[];
  allFolderIds: number[];
  allFolderNodes: DriveFolderNode[];

  selectedFolder?: DriveFolder | null;
  currentFolder?: DriveFolder | null;
  selectedFile?: DriveFile | null;
  currentFile?: DriveFile | null;
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
