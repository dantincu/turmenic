import {
  AppDriveData,
  DriveItem,
  DriveFile,
  DriveFolder,
  assureIsFolder,
  isFolder,
  isFile,
  asFolderOrNull,
} from "./driveItems.types";

import { DriveItemProps } from "../../components/driveItem/DriveItemProps";

export const toDriveItemProps = (driveItem: DriveItem): DriveItemProps => {
  const driveFolder = asFolderOrNull(driveItem);

  const driveItemProps = <DriveItemProps>{
    uxIntId: driveItem.uxIntId,
    name: driveItem.name,
    isFolder: isFolder(driveItem) ?? false,
    files: driveFolder?.files?.map((fl) => toDriveItemProps(fl)),
    subFolders: driveFolder?.subFolders?.map((fd) => toDriveItemProps(fd)),
  };

  return driveItemProps;
};
