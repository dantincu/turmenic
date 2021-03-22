import { MouseEvent } from "react";

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
  events: DriveItemEvts;
  onFolderToggled?: (idntty: DriveItemIdentity) => void;
  cssClass?: string;
}

export interface DriveItemNameProps {
  itemName: string;
  selected?: boolean;
  current?: boolean;
  onClick?: (e: MouseEvent) => void;
  onDoubleClick?: (e: MouseEvent) => void;
  onMiddleClick?: (e: MouseEvent) => void;
  onRightClick?: (e: MouseEvent) => void;
}
