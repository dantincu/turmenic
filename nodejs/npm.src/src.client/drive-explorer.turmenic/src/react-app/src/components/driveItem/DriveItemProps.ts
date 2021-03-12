export interface DriveItemProps {
  uxIntId: number;
  name: string;
  isFolder: boolean;
  collapsed?: boolean;
  cssClass?: string;
  files?: DriveItemProps[];
  subFolders?: DriveItemProps[];
  onToggled?: (collapsed: boolean) => void;
}
