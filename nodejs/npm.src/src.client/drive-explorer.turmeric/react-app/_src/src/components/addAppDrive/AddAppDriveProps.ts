import { NewAppDrive } from "../../api/api.types";

export interface AddAppDriveProps {
  isOpen: boolean;
  toggle: () => void;
  onSubmit: (newAppDrive: NewAppDrive) => void;
}
