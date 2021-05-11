import { ApiResponse } from "../../src.node.common.client/axios/api.types";
import { AddAppDrive } from "../../src.node.common/app-data/device-app-drives/request.types";
import { AppDrive } from "../../src.node.common/app-data/device-app-drives/types";

export interface DeviceAppDriveFields {
  displayName: string;
  description: string;
  path: string;
}

export interface AddDeviceAppDriveModalProps {
  initialData?: DeviceAppDriveFields | null | undefined;
  isOpen: boolean;
  toggle: () => void;
  onSubmit: (newAppDrive: AddAppDrive) => Promise<ApiResponse<AppDrive, any>>;
}
