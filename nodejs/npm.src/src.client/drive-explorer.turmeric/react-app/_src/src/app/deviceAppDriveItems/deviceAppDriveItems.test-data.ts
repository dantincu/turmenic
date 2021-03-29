import {
  DriveFolder,
  DeviceAppDrives,
  AppSession,
  AppDrive,
  DriveFile,
  DriveItem,
  DriveNode,
} from "../../js.common/src.node.common/app-data/deviceAppDriveItems/types";

import {
  testData as baseTestData,
  createFile,
  createFolder,
  genId,
  genUuid,
} from "./deviceAppDriveItems.test-data.base";

const createSubFoldersArr = (
  appSessionDrives: AppSession,
  depth: number,
  breadth: number
) => {
  const arr: DriveNode[] = [];

  if (depth > 0) {
    for (let i = 0; i < breadth; i++) {
      const { node, folder } = createFolder(appSessionDrives, [], []);
      arr.push(node);

      node.childNodes = createSubFoldersArr(appSessionDrives, depth - 1, breadth);
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
  appSessionDrives: AppSession,
  depth: number,
  breadth: number
): { folder: DriveFolder; node: DriveNode } => {
  const { folder, node } = createFolder(appSessionDrives, []);

  node.childNodes = createSubFoldersArr(appSessionDrives, depth - 1, breadth);
  createFilesArr(folder, node, breadth);

  return { folder, node };
};

const createAppDrive = (
  appSessionDrives: AppSession,
  depth: number,
  breadth: number
) => {
  const { folder, node } = createRootFolder(appSessionDrives, depth, breadth);

  const uuidB64 = genUuid();

  appSessionDrives.appDrives.push({
    uuid: uuidB64,
    label: uuidB64,
    rootFolder: folder,
    rootFolderNode: node,
  });
};

const generateData = (
  testData: DeviceAppDrives,
  drivesCount: number,
  depth: number,
  breadth: number
) => {
  for (let i = 0; i < drivesCount; i++) {
    createAppDrive(testData.appSession, depth, breadth);
  }
};

generateData(baseTestData, 4, 4, 4);

export const testData = baseTestData;
