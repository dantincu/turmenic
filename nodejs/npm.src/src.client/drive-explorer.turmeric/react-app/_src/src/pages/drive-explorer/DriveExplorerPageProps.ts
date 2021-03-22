import {
  DriveItemEvts,
  DriveItemIdentity,
} from "../../components/driveItem/DriveItemProps";

export interface DriveExplorerPageProps {
  events?: DriveItemEvts;
  onFolderToggled?: (idntty: DriveItemIdentity) => void;
}
