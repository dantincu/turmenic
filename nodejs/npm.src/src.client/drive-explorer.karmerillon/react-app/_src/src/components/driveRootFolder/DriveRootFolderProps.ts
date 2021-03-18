import { DriveItemProps } from "../driveItem/DriveItemProps";

export interface DriveRootFolderProps {
  rootFolder: DriveItemProps;
  onFolderToggled?: (folderUuidB64: string) => void;
  onItemSelected?: (itemUuidB64: string, previewSelection: boolean) => void;
  onItemRightClick?: (itemUuidB64: string) => void;
}
