import { v4 as uuid } from "uuid";

import { uStrId } from "../../js.common/dist/src.node.common/data/uStrId";

import {
  DriveFolder,
  DeviceAppDriveSessions,
  AppSession,
  AppDrive,
  DriveFile,
  DriveItem,
  DriveNode,
  FileNode,
  FolderNode,
} from "../../js.common/src.node.common/app-data/device-app-drives/types";

import {
  testData as baseTestData,
  createFile,
  createFolder,
} from "./deviceAppDriveItems.test-data.base";

const createSubFoldersArr = (
  appSessionDrives: AppSession,
  parentFolderUuid: string | null,
  depth: number,
  breadth: number
) => {
  const arr: FolderNode[] = [];

  if (depth > 0) {
    for (let i = 0; i < breadth; i++) {
      const { node, folder } = createFolder(
        appSessionDrives,
        [],
        parentFolderUuid
      );
      arr.push(node);

      node.subFolderNodes = createSubFoldersArr(
        appSessionDrives,
        folder.uuid,
        depth - 1,
        breadth
      );
    }
  }

  return arr;
};

const createFilesArr = (
  parentFolder: DriveFolder,
  parentNode: DriveNode,
  breadth: number
) => {
  for (let i = 0; i < breadth; i++) {
    createFile(parentFolder, parentNode);
  }
};

const createRootFolder = (
  appSession: AppSession,
  depth: number,
  breadth: number
): { folder: DriveFolder; node: DriveNode } => {
  const { folder, node } = createFolder(appSession, []);
  folder.isRoot = true;

  node.subFolderNodes = createSubFoldersArr(
    appSession,
    folder.uuid,
    depth - 1,
    breadth
  );

  createFilesArr(folder, node, breadth);
  return { folder, node };
};

const createAppDrive = (
  appSession: AppSession,
  depth: number,
  breadth: number
) => {
  const { folder, node } = createRootFolder(appSession, depth, breadth);
  const uuid = uStrId();

  appSession.appDrives.push({
    uuid: uuid,
    label: uuid,
    rootFolder: folder,
    rootFolderNode: node,
  });
};

const generateData = (
  testData: DeviceAppDriveSessions,
  drivesCount: number,
  depth: number,
  breadth: number
) => {
  for (let i = 0; i < drivesCount; i++) {
    createAppDrive(testData.defaultAppSession as AppSession, depth, breadth);
  }
};

generateData(baseTestData, 4, 4, 4);
export const testData = baseTestData;
