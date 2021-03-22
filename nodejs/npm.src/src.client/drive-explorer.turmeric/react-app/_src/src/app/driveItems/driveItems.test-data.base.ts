import { v4 as uuid } from "uuid";

import { intIdGenerator } from "../../js.common/dist/src.common/utils/intIdGenerator";
import { uStrId } from "../../js.common/dist/src.node.common/data/uStrId";
import {
  DriveFolder,
  AppDrive,
  DriveFolderNode,
  DriveFile,
  DriveFileNode,
  DriveItem,
  DriveNode,
  DeviceAppDrives,
  AppSessionDrives,
} from "./driveItems.types";

import { strReplaceAll } from "../../js.common/dist/src.common/text/utils";

export const genId = intIdGenerator.getNextId;
export const genUuid = uStrId;
export const genRandName = () => {
  const randName = strReplaceAll(uuid(), "-", "");
  return randName;
};

export const testData: DeviceAppDrives = {
  allAppDrives: [],
  appSessionDrives: {
    appDrives: [],
    allFolders: [],
    allFolderIds: [],
    allFolderNodes: [],
  },
};

export const createFolder = (
  appSessionDrives: AppSessionDrives,
  subFolderNodes: DriveFolderNode[],
  fileNodes: DriveFileNode[]
): { node: DriveFolderNode; folder: DriveFolder } => {
  const folder: DriveFolder = {
    id: genId(),
    name: genRandName(),
  };

  appSessionDrives.allFolderIds.push(folder.id);
  appSessionDrives.allFolders.push(folder);

  const node: DriveFolderNode = {
    itemId: folder.id,
    itemIsFolder: true,
    subFolderNodes: subFolderNodes,
    fileNodes: fileNodes,
  };

  appSessionDrives.allFolderNodes.push(node);

  return { node, folder };
};

export const createFile = (
  parentFolder: DriveFolder,
  parentFolderNode: DriveFolderNode
): { node: DriveFileNode; file: DriveFile } => {
  const fileNameWithoutExtension = genRandName();

  const file: DriveFile = {
    id: genId(),
    name: `${fileNameWithoutExtension}.txt`,
    nameWithoutExtension: fileNameWithoutExtension,
  };

  parentFolder.files = parentFolder.files ?? [];
  parentFolder.files.push(file);

  const node: DriveFileNode = {
    itemId: file.id,
    itemIsFolder: false,
  };

  parentFolderNode.fileNodes = parentFolderNode.fileNodes ?? [];
  parentFolderNode.fileNodes.push(node);

  return { node, file };
};
