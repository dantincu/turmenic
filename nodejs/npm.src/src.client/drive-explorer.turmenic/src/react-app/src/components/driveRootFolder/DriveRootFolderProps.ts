import { DriveItemProps } from "../driveItem/DriveItemProps";

export interface DriveRootFolderProps {
  rootFolder: DriveItemProps;
  onFolderToggled?: (folderUxIntId: number) => void;
}
