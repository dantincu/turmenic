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

import {
  testData as baseTestData,
  createFile,
  createFolder,
  genId,
  genUuid,
} from "./driveItems.test-data.base";

const createSubFoldersArr = (
  appSessionDrives: AppSessionDrives,
  depth: number,
  breadth: number
) => {
  const arr: DriveFolderNode[] = [];

  if (depth > 0) {
    for (let i = 0; i < breadth; i++) {
      const { node, folder } = createFolder(appSessionDrives, [], []);
      arr.push(node);

      node.subFolderNodes = createSubFoldersArr(
        appSessionDrives,
        depth - 1,
        breadth
      );

      node.fileNodes = createFilesArr(folder, node);
    }
  }

  return arr;
};

const createFilesArr = (
  parentFolder: DriveFolder,
  parentFolderNode: DriveFolderNode
) => {
  const arr: DriveFileNode[] = [];

  for (let i = 0; i < 4; i++) {
    arr.push(createFile(parentFolder, parentFolderNode).node);
  }

  return arr;
};

const createRootFolder = (
  appSessionDrives: AppSessionDrives,
  depth: number,
  breadth: number
): { folder: DriveFolder; node: DriveFolderNode } => {
  const { folder, node } = createFolder(appSessionDrives, [], []);

  node.subFolderNodes = createSubFoldersArr(
    appSessionDrives,
    depth - 1,
    breadth
  );

  node.fileNodes = createFilesArr(folder, node);

  return { folder, node };
};

const createAppDrive = (
  appSessionDrives: AppSessionDrives,
  depth: number,
  breadth: number
) => {
  const { folder, node } = createRootFolder(appSessionDrives, depth, breadth);

  appSessionDrives.appDrives.push({
    uuidB64: genUuid(),
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
    createAppDrive(testData.appSessionDrives, depth, breadth);
  }
};

generateData(baseTestData, 4, 4, 4);

export const testData = baseTestData;
