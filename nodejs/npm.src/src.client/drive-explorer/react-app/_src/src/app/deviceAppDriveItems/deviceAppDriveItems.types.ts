import {
  DeviceAppDriveSessions,
  FileNode,
  FolderNode,
  AppDrive,
  DriveNode,
  DriveItem,
  DriveFile,
  AppSession,
  DriveFolder,
} from "../../src.node.common/app-data/device-app-drives/types";

export interface DriveNodeUx {
  uuid: string;
  parentFolderUuid?: string | null;
  name: string;
}

export interface FolderNodeUx extends DriveNodeUx {
  subFolderNodes?: FolderNodeUx[] | null | undefined;
  fileNodes?: FileNodeUx[] | null | undefined;
}

export interface FileNodeUx extends DriveNodeUx {}

export interface AppDriveUx {
  rootFolderNode: FolderNodeUx;
}

export interface AppSessionUx {
  uuid: string;

  appDrives: AppDriveUx[];
}
