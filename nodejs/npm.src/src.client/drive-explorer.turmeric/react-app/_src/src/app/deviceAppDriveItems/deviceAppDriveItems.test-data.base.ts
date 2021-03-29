import { v4 as uuid } from "uuid";

import { intIdGenerator } from "../../js.common/dist/src.common/utils/intIdGenerator";
import { uStrId } from "../../js.common/dist/src.node.common/data/uStrId";
import {
  DriveFolder,
  DriveFile,
  DeviceAppDrives,
  AppSession,
  DriveNode,
  AppDrive,
  DriveItem,
} from "../../js.common/src.node.common/app-data/deviceAppDriveItems/types";

import { strReplaceAll } from "../../js.common/dist/src.common/text/utils";

export const genId = intIdGenerator.getNextId;
export const genUuid = uStrId;
export const genRandName = () => {
  const randName = strReplaceAll(uuid(), "-", "");
  return randName;
};

export const testData: DeviceAppDrives = {
  allAppDrives: [],
  appSession: {
    appDrives: [],
    allFolders: [],
    allFolderIds: [],
    allFolderNodes: [],
  },
};

export const createFolder = (
  appSessionDrives: AppSession,
  subNodes: DriveNode[]
): { node: DriveNode; folder: DriveFolder } => {
  const folder: DriveFolder = {
    id: genId(),
    name: genRandName(),
  };

  appSessionDrives.allFolderIds.push(folder.id);
  appSessionDrives.allFolders.push(folder);

  const node: DriveNode = {
    itemId: folder.id,
    childNodes: subNodes,
  };

  appSessionDrives.allFolderNodes.push(node);

  return { node, folder };
};

export const createFile = (
  parentFolder: DriveFolder,
  parentNode: DriveNode
): DriveFile => {
  const fileNameWithoutExtension = genRandName();

  const file: DriveFile = {
    id: genId(),
    name: `${fileNameWithoutExtension}.txt`,
    nameWithoutExtension: fileNameWithoutExtension,
    parentFolderId: parentFolder.id,
  };

  parentFolder.files = parentFolder.files ?? [];
  parentFolder.files.push(file);

  return file;
};
