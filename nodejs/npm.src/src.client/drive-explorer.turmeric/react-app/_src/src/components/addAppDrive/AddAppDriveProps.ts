import { DeviceRootDirLocation } from "../../js.common/src.node.common/app-data/schema/device-dir-locations.schema";
import { ApiResponse } from "../../api/api.types";

export interface AddAppDriveProps {
  isOpen: boolean;
  toggle: () => void;
  onSubmit: (
    newAppDrive: DeviceRootDirLocation
  ) => Promise<ApiResponse<DeviceRootDirLocation[], any>>;
}
