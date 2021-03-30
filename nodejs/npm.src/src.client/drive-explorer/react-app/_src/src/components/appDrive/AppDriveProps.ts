import { DriveFolderProps } from "../driveItem/DriveItemProps";

export interface AppDriveProps {
  uuid: string;
  label: string;
  rootFolder: DriveFolderProps;
  rootFolderCompCreator: (rootFolder: DriveFolderProps) => JSX.Element;
}
