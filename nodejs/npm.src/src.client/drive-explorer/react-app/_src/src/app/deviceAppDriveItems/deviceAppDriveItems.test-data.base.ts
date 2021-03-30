import { v4 as uuid } from "uuid";

import { uStrId } from "../../js.common/dist/src.node.common/data/uStrId";
import {
  DriveFolder,
  DriveFile,
  DeviceAppDriveSessions,
  AppSession,
  DriveNode,
  AppDrive,
  DriveItem,
  FileNode,
  FolderNode,
} from "../../js.common/src.node.common/app-data/device-app-drives/types";

import { strReplaceAll } from "../../js.common/dist/src.common/text/utils";

export const genRandName = () => {
  let randName = strReplaceAll(uuid(), "-", "");
  randName = [randName, randName, randName, randName, randName].join(".");
  return randName as string;
};

export const testData: DeviceAppDriveSessions = {
  allAppDrives: [],
  defaultAppSession: {
    uuid: uStrId(),
    appDrives: [],
    allFolders: [],
  },
  appSessions: [],
};

export const createFolder = (
  appSession: AppSession,
  subFolderNodes: DriveNode[],
  parentFolderUuid?: string | null
): { node: FolderNode; folder: DriveFolder } => {
  const node: FolderNode = {
    uuid: uStrId(),
    name: genRandName(),
    parentFolderUuid: parentFolderUuid,
    subFolderNodes: subFolderNodes,
  };

  const folder: DriveFolder = {
    uuid: node.uuid,
    name: node.name,
    node: node,
    parentFolderUuid: parentFolderUuid,
    path: `/A/${genRandName()}`,
  };

  appSession.allFolders.push(folder);
  return { node, folder };
};

export const createFile = (
  parentFolder: DriveFolder,
  parentNode: DriveNode
): DriveFile => {
  const fileNameWithoutExtension = genRandName();

  const file: DriveFile = {
    uuid: uStrId(),
    name: `${fileNameWithoutExtension}.txt`,
    nameWithoutExtension: fileNameWithoutExtension,
    parentFolderUuid: parentNode.uuid,
    path: `/A/${genRandName()}`,
  };

  parentFolder.files = parentFolder.files ?? [];
  parentFolder.files.push(file);

  return file;
};
