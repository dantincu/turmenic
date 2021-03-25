import { DriveFolderProps } from "../driveItem/DriveItemProps";

export interface DriveRootFolderProps {
  uuidB64: string;
  label: string;
  rootFolder: DriveFolderProps;
  rootFolderCompCreator: (rootFolder: DriveFolderProps) => JSX.Element;
}
