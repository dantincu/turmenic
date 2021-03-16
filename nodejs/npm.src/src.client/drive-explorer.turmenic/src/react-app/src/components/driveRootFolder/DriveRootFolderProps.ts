import { DriveItemProps } from "../driveItem/DriveItemProps";

export interface DriveRootFolderProps {
  rootFolder: DriveItemProps;
  onFolderToggled?: (folderUuidB64: string) => void;
}
