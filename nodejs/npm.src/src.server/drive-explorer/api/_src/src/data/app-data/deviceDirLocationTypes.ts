import { DeviceDirLocationType } from "../../../src.node.common/app-data/schema/device-dir-locations.schema.js";

export const deviceDirLocationTypeKeys = {
  osFsDir: "os-fs-dir",
  cldStrgBsync: "cld-strg-bsync",
};

/*
  uuid: string;
  key: string;
  name: string;
  description: string;
*/
export const deviceDirLocationTypes: DeviceDirLocationType[] = [
  {
    key: deviceDirLocationTypeKeys.osFsDir,
    name: "Device file system directory location",
    description:
      "A non-specific device/machine file system directory location (directory path may be local or network, physical or virtual)",
  },
  {
    key: deviceDirLocationTypeKeys.cldStrgBsync,
    name: "Cloud storage backup and sync device file system directory location",
    description:
      "Cloud storage backup and sync device/machine file system directory location (directory path may be local or network, physical or virtual)",
  },
];
