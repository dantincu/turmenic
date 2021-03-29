import {
  DriveFolderProps,
  DriveFileProps,
  DriveItemEvts,
} from "../driveItem/DriveItemProps";

export interface DeviceAppDriveFolderProps extends DriveFolderProps {
  deviceAppDriveFolderEvents?: DriveItemEvts;
}

export interface DeviceAppDriveFileProps extends DriveFileProps {
  deviceAppDriveFileEvents?: DriveItemEvts;
}
