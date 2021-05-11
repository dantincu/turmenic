import { MouseEvent } from "react";

import { RootState } from "../../app/store";
import {
  DriveFile,
  DriveFolder,
} from "../../src.node.common/app-data/device-app-drives/types";

export interface DriveItemIdentity {
  itemUuid: string;
  itemIsFile: boolean;
  parentFolderUuid?: string;
  rootFolderUuid: string;
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
  label?: string | null;
  tooltipText?: string;
  events: DriveItemEvts;
  cssClass?: string;
  storeFileSelector: (
    folderUuid: string,
    fileUuid: string
  ) => (state: RootState) => DriveFile | undefined;
}

export interface DriveFileProps extends DriveItemProps {}

export interface DriveFolderProps extends DriveItemProps {
  onFolderToggled?: (idntty: DriveItemIdentity) => void;
  onSubFolderToggled?: (idntty: DriveItemIdentity) => void;
  storeFolderSelector: (
    folderUuid: string
  ) => (state: RootState) => DriveFolder | undefined;
  storeSubFoldersSelector: (
    parentFolderUuid?: string | null
  ) => (state: RootState) => DriveFolder[] | undefined;
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
  onContextMenu?: (e: MouseEvent) => void;
}
