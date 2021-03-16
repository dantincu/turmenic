export interface DriveItemProps {
  itemUuidB64: string;
  parentFolderUuidB64?: string;
  cssClass?: string;
  onFolderToggled?: (folderUuidB64: string) => void;
  onItemSelected?: (itemUuidB64: string) => void;
}
