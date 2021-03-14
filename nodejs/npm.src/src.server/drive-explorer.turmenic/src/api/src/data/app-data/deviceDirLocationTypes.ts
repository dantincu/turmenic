import { DeviceDirLocationType } from "../schema/device-dir-locations.schema.js";

/*
  uuid: string;
  key: string;
  name: string;
  description: string;
*/
export const deviceDirLocationTypes: DeviceDirLocationType[] = [
  {
    key: "os-fs-dir",
    name: "Device file system directory location",
    description:
      "A non-specific device/machine file system directory location (directory path may be local or network, physical or virtual)",
  },
  {
    key: "cld-strg-bsync",
    name: "Cloud storage backup and sync device file system directory location",
    description:
      "Cloud storage backup and sync device/machine file system directory location (directory path may be local or network, physical or virtual)",
  },
];
