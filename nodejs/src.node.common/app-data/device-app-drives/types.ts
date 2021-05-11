export interface DriveNode {
  uuid: string;
  parentFolderUuid?: string | null;
  name: string;
}

export interface FolderNode extends DriveNode {
  subFolderNodes?: FolderNode[] | null | undefined;
}

export interface FileNode extends DriveNode {}

export interface DriveItem extends DriveNode {
  label?: string | null;
  path?: string | null;
  orderIdx?: number | null;
  isSelected?: boolean | null;
  isCurrent?: boolean | null;
  itemIsFolder?: boolean | null;
}

export interface DriveFile extends DriveItem {
  nameWithoutExtension: string;
  extension?: string | null;
}

export interface DriveFolder extends DriveItem {
  node: FolderNode;
  files?: DriveFile[] | null;
  expanded?: boolean;
  isRoot?: boolean | null;
}

export interface AppDrive {
  uuid: string;
  label: string;
  description?: string | null | undefined;
  deviceRootDirLocationUuid?: string | null | undefined;
  sortIdx: number;

  rootFolder: DriveFolder;
  rootFolderNode: FolderNode;
}

export interface AppSession {
  uuid: string;
  name: string;
  description: string;

  appDrives: AppDrive[];
  allFolders: DriveFolder[];

  selectedFolderNode?: FolderNode | null;
  selectedFileNode?: FileNode | null;

  currentFolderNode?: FolderNode | null;
  currentFileNode?: FileNode | null;
}

export interface DeviceAppDriveSessions {
  allAppDrives: AppDrive[];
  appSessions: AppSession[];
  defaultAppSession?: AppSession | null;
}
