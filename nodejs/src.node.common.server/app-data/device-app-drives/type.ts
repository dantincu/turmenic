import path from "path";

import {
  AppSession,
  DriveItem,
} from "../../../src.node.common/app-data/device-app-drives/types.js";

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
