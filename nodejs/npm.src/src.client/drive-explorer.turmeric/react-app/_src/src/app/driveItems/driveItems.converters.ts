import { DriveItem, DriveFolder } from "./driveItems.types";
import {
  DriveItemProps,
  DriveItemIdentity,
  DriveItemEvts,
} from "../../components/driveItem/DriveItemProps";

export interface DriveItemConversionData {
  rootFolderId: number;
  drItm: DriveItem;
  events: DriveItemEvts;
  onFolderToggled?: (idntty: DriveItemIdentity) => void;
}

export const driveItemToProps = (data: DriveItemConversionData) => {
  const itemIsFile = typeof (data.drItm as DriveFolder).files === "object";

  const drItmProps: DriveItemProps = {
    idntty: {
      itemIsFile: itemIsFile,
      itemId: data.drItm.id,
      parentFolderId: data.drItm.parentFolderId,
      rootFolderId: data.rootFolderId,
    },
    events: data.events,
  };

  if (itemIsFile === false) {
    drItmProps.onFolderToggled = data.onFolderToggled;
  }

  return drItmProps;
};
