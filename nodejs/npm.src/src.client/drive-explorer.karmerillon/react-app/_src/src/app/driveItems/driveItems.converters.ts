import { DriveItem } from "./driveItems.types";

import { DriveItemProps } from "../../components/driveItem/DriveItemProps";

export const toDriveItemProps = (driveItem: DriveItem): DriveItemProps => {
  const driveItemProps = {
    itemUuidB64: driveItem.uuidB64,
    parentFolderUuidB64: driveItem.parentFolderUuidB64,
  };

  return driveItemProps;
};
