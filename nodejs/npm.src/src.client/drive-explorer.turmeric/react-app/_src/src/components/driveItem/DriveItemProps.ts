import { MouseEvent } from "react";

import { RootState } from "../../app/store";
import {
  DriveFile,
  DriveFolder,
} from "../../app/deviceAppDriveItems/deviceAppDriveItems.types";

export interface DriveItemIdentity {
  itemId: number;
  itemIsFile: boolean;
  parentFolderId?: number;
  rootFolderId: number;
}

export interface DriveItemEvts {
  onItemSelected?: (
    idntty: DriveItemIdentity,
    previewSelection: boolean
  ) => void;
  onItemCtxMenu?: (idntty: DriveItemIdentity) => void;
}

export interface DriveItemProps {
  idntty: DriveItemIdentity;
  label?: string;
  tooltipText?: string;
  events: DriveItemEvts;
  cssClass?: string;
  storeFileSelector: (
    folderId: number,
    fileId: number
  ) => (state: RootState) => DriveFile | undefined;
}

export interface DriveFileProps extends DriveItemProps {}

export interface DriveFolderProps extends DriveItemProps {
  onFolderToggled?: (idntty: DriveItemIdentity) => void;
  onSubFolderToggled?: (idntty: DriveItemIdentity) => void;
  storeFolderSelector: (
    folderId: number
  ) => (state: RootState) => DriveFolder | undefined;
  storeSubFoldersSelector: (
    parentFolderId?: number | null
  ) => (state: RootState) => DriveFolder[];
  filesEvents?: DriveItemEvts;
  subFoldersEvents?: DriveItemEvts;
  subFolderCompCreator?: (props: DriveFolderProps) => JSX.Element;
  fileCompCreator?: (props: DriveFileProps) => JSX.Element;
}

export interface DriveItemNameProps {
  itemName: string;
  itemTooltipText?: string;
  selected?: boolean;
  current?: boolean;
  onClick?: (e: MouseEvent) => void;
  onDoubleClick?: (e: MouseEvent) => void;
  onMiddleClick?: (e: MouseEvent) => void;
  onRightClick?: (e: MouseEvent) => void;
}
