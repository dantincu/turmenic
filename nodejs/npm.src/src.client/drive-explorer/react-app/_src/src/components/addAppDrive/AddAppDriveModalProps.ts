import { ApiResponse } from "../../api/api.types";
import { AddAppDrive } from "../../src.node.common/app-data/device-app-drives/request.types";
import { AppDrive } from "../../src.node.common/app-data/device-app-drives/types";

export interface AppDriveFields {
  displayName: string;
  description: string;
  path: string;
}

export interface AddAppDriveModalProps {
  initialData?: AppDriveFields | null | undefined;
  isOpen: boolean;
  toggle: () => void;
  onSubmit: (newAppDrive: AddAppDrive) => Promise<ApiResponse<AppDrive, any>>;
}
