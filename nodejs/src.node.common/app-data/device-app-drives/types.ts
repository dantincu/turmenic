export interface DriveNode {
  // idty: Idty;
  uuid: string;
  // parentFolderIdty?: Idty;
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
  // idty: Idty;
  uuid: string;
  label: string;

  rootFolder: DriveFolder;
  rootFolderNode: FolderNode;
}

export interface AppSession {
  // idty: Idty;
  uuid: string;

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
