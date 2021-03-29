import { DriveFolderProps } from "../driveItem/DriveItemProps";

export interface DriveRootFolderProps {
  uuid: string;
  label: string;
  rootFolder: DriveFolderProps;
  rootFolderCompCreator: (rootFolder: DriveFolderProps) => JSX.Element;
}
