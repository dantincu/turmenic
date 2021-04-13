import { DeviceRootDirLocation } from "../../src.node.common/app-data/schema/device-dir-locations.schema";
import { ApiResponse } from "../../api/api.types";

export interface AppDriveFields {
  displayName: string;
  description: string;
  path: string;
}

export interface AddAppDriveModalProps {
  initialData?: AppDriveFields | null | undefined;
  isOpen: boolean;
  toggle: () => void;
  onSubmit: (
    newAppDrive: DeviceRootDirLocation
  ) => Promise<ApiResponse<DeviceRootDirLocation[], any>>;
}
