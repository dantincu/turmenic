import { DriveItem } from "./driveItems.types";

import { DriveItemProps } from "../../components/driveItem/DriveItemProps";

export const toDriveItemProps = (driveItem: DriveItem): DriveItemProps => {
  const driveItemProps = {
    itemUxIntId: driveItem.uxIntId,
    parentFolderUxIntId: driveItem.parentFolderUxIntId,
  };

  return driveItemProps;
};
