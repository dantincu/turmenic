import path from "path";
// import { Idty, idtyEquals } from "../../../src.common/data/idty.js";

export interface DriveNode {
  // idty: Idty;
  uuid: string;
  // parentFolderIdty?: Idty;
  parentFolderUuid?: string;
  name: string;
}

export interface FolderNode extends DriveNode {
  subFolderNodes?: FolderNode[] | null | undefined;
}

export interface FileNode extends DriveNode {}

export interface DriveItem extends DriveNode {
  label?: string;
  path?: string;
  orderIdx?: number;
  isSelected?: boolean;
  isCurrent?: boolean;
  itemIsFolder?: boolean;
}

export interface DriveFile extends DriveItem {
  nameWithoutExtension: string;
  extension?: string;
}

export interface DriveFolder extends DriveItem {
  node: FolderNode;
  files?: DriveFile[];
  expanded?: boolean;
  isRoot?: boolean;
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
  selectedFileNode?: FolderNode | null;

  currentFolderNode?: FileNode | null;
  currentFileNode?: FileNode | null;
}

export interface DeviceAppDriveSessions {
  allAppDrives: AppDrive[];
  appSessions: AppSession[];
}

export const assureDriveItemPath = (
  appSession: AppSession,
  driveItem: DriveItem
) => {
  if (!driveItem.path) {
    const parentFolder = appSession.allFolders.find(
      (folder) => folder.uuid === driveItem.uuid
    );

    if (parentFolder) {
      const parentFolderPath =
        parentFolder.path ?? assureDriveItemPath(appSession, parentFolder);
      if (parentFolderPath) {
        driveItem.path = path.join(parentFolderPath, driveItem.name);
      }
    }
  }

  return driveItem.path;
};
