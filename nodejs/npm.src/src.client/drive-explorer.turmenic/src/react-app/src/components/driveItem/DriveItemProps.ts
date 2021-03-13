export interface DriveItemProps {
  itemUxIntId: number;
  parentFolderUxIntId?: number;
  cssClass?: string;
  onFolderToggled?: (folderUxIntId: number) => void;
}
